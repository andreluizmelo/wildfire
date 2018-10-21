import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpService } from '../../core/http.service';

import { Report } from '../../models/report';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app'
import { GPSHelper } from '../../helpers/GPSHelper';

@Injectable()
export class ReportService extends BaseService {
    private reportsCollection: AngularFirestoreCollection<Report>;
    reports: Observable<Report[]>;

    constructor(http: HttpService, private afs: AngularFirestore) {
        super(http, 'api');
        this.reportsCollection = afs.collection<Report>('reports');
    }

    public addReport(report: Report){
        let id = this.afs.createId();
        report.id = id;
        report.location = new firebase.firestore.GeoPoint((report.latitude as number), (report.longitude as number));
        report.timestamp = (new Date(Date.now())).toISOString();
        this.reportsCollection.add(JSON.parse(JSON.stringify(report)));
    }

    public getReports(successAction: (data) => void){
      let gps = new GPSHelper();
      gps.getPosition().then((pos: any) => {
        //let baseurl = window.location.origin;
        let baseurl = "http://snasa.herokuapp.com";
        this.subscriptions.push(this.http.get(baseurl+"/incidents?latitude="+pos.latitude+"&longitude="+pos.longitude).subscribe(data => {
          console.log(data);
            successAction(data.sort((a,b) => {
                if(a.datetime > b.datetime)
                    return 1;
                else if( a.datetime < b.datetime)
                    return -1;
                else
                    return 0;
            }).reverse())
        },(error)=>{
            console.log;(error);
        }));
      });
    }

    public getRisk(successAction: (data) => void){
        let gps = new GPSHelper();
        gps.getPosition().then((pos: any) => {
            //let baseurl = window.location.origin;
            let baseurl = "http://snasa.herokuapp.com";
            this.subscriptions.push(this.http.get(baseurl+"/risk?latitude="+pos.latitude+"&longitude="+pos.longitude).subscribe(data => {
            console.log(data);
                //{"temperature": 75.26840000000001, "humidity": 56, "pressure": 993.52, "wind": 1.59, "danger": "low"}
                successAction(data);
            },(error)=>{
                console.log;(error);
            }));
        });
    }
}

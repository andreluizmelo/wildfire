import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {Camera, CameraOptions} from 'ionic-native';
import { Report } from '../../models/report';
import { ReportTypeItem } from './report-type-item';
import { ReportService } from '../../services/report-service/report-service.service';
import { HomePage } from '../home/home';
import {GPSHelper} from '../../helpers/GPSHelper';
@Component({
  selector: 'page-create-report',
  templateUrl: 'create-report.html',
})
export class CreateReportPage implements OnInit {
  public base64Image: string;
  public positionFound: boolean = false;
  public latitude: number;
  public longitude: number;
  public report: Report;
  public description: string = '';
  public type: string = '';
  public writingFirebase: boolean = false;
  public reportTypes: ReportTypeItem[] = [
    {value: "risk", label: "Risk of Fire", checked: false},
    {value: "fire", label: "Fire", checked: false},
    {value: "smoke", label: "Smoke", checked: false},
    {value: "others", label: "Others", checked: false}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private reportService: ReportService, public loadingCtrl: LoadingController) {
  }

  ngOnInit(){
    this.report = new Report();
    this.getLocation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateReportPage');
  }

  private getLocation(){
    //TODO pegar do GPS
    //this.latitude = -22.8938492;
    //this.longitude = -43.1991803;
    let gps = new GPSHelper();
    gps.getPosition().then((pos:any)=>{
        this.latitude = pos.latitude;
        this.longitude = pos.longitude;
        this.positionFound = true;
    })
  }

  public createReport() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.writingFirebase = true;
    this.report.description = this.description;
    this.report.type = this.type;
    this.report.image = this.base64Image;
    this.report.latitude = this.latitude;
    this.report.longitude = this.longitude;
    this.report.location = this.latitude.toString() + ', ' + this.longitude.toString();
    this.report.severity = 'Baixa';
    this.reportService.addReport(this.report);

    var self = this;
    setTimeout(() => {
      self.writingFirebase = false;
      self.description = '';
      self.type = '';
      self.base64Image = '';
      loading.dismiss();
      self.navegarParaHome(null);
    }, 1500);
  }

  options: CameraOptions = {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    correctOrientation: true
  }

  public navegarParaHome(event): void {
    this.navCtrl.setRoot(HomePage);
  }

  takePicture(sourceType:number) {
    this.options.sourceType = sourceType;
    Camera.getPicture(this.options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  teste(){

  }
}

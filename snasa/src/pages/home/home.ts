import { Component, NgModule, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TestService } from '../../services/test-service/test-service';
import { CreateReportPage } from '../create-report/create-report';
import { AlertController } from 'ionic-angular';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report-service/report-service.service';
import { ISubscription } from '../../../node_modules/rxjs/Subscription';
import {GPSHelper} from '../../helpers/GPSHelper';
import { ToastController } from 'ionic-angular';
declare var google;

import * as $ from "jquery";

declare var MarkerClusterer;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@NgModule({
})
export class HomePage {

  readonly ICONE_REPORT = 1;
  readonly ICONE_ELETRICIDADE = 2;
  readonly ICONE_PERIGO = 3;

  public demoReport: Report[] = [];
  public subscriptions: ISubscription[] = [];
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentInfoWindow: any;
  markers: any[] = [];
  markerCluster: any;



  constructor(public navCtrl: NavController,
    public reportService: ReportService,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.loadMap().then(()=>{
        this.addUserMarker();
        this.carregarMarcadores();
        this.carregaRisco();
    });
  }

  carregaRisco(){
    this.reportService.getRisk((risk)=>{
        var msg = "";
        if(risk.danger === "moderate"){
            msg = "Stay Alert! The weather is very hot and dry there is a potencial risk of fire."
            setTimeout(()=>{
                var el:any = document.getElementsByClassName("toast-container")[0];
                el.style.backgroundColor = "orange";
            },30);
        }else if (risk.danger === "high") {
            msg = "You are in dangerous area, be carefull with fires.";
            setTimeout(()=>{
                var el:any = document.getElementsByClassName("toast-container")[0];
                el.style.backgroundColor = "red";
            },30);
        }else{
            msg = "You are in safe area!";
            setTimeout(()=>{
                var el:any = document.getElementsByClassName("toast-container")[0];
                el.style.backgroundColor = "green";
            },30);
        }
        const toast = this.toastCtrl.create({
            message: msg,
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
        toast.present();

    })
  }

  loadMap() {
    return new Promise((resolve,reject)=>{
        let gps = new GPSHelper();
        gps.getPosition().then((pos :any)=>{
            //let latLng = new google.maps.LatLng(-22.8938492, -43.1991803);
            let latLng = new google.maps.LatLng(pos.latitude, pos.longitude);
            let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false
            };

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            resolve();
            // google.maps.event.addListener(this.map, 'click', function () {
            //   console.log(this.currentInfoWindow);
            //   if (this.currentInfoWindow)
            //     this.currentInfoWindow.close();
            // });

        })
    });


  }
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  carregarMarcadores(){
    this.reportService.getReports(data=>{
        this.setMapOnAll(null);
        this.markers = [];
        console.log(data);
        data.forEach(report=>{
          this.addMarker(report);
        });
        this.markerCluster = new MarkerClusterer(this.map, this.markers,
          { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', maxZoom: 19 });
    });
    // this.demoReport.forEach(report=>{
    //   this.addMarker(report)

    // })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => {
      subs.unsubscribe();
    })
  }

  onErrorGeolocation() {
    let latLng = new google.maps.LatLng(-22, 9121, -43, 2301);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
      streetViewControl: false,
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.presentAlert();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Não foi possível obter sua localização. Certifique-se que a localização está habilitada em seu dispositivo.',
      buttons: ['Dismiss']
    });
    alert.present();
  }


  addMarker(report: any) {
    let iconDir = "";
    if (report.severity == "Altissima") {
      iconDir = './assets/imgs/death_2.png'
    }
    else {
      iconDir = './assets/imgs/exclamation_2.png';
    }
    console.log(report);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(report.location.coordinates[1], report.location.coordinates[0]),
      icon: { url: iconDir },
    });


    var infoWindowContent = '<div>' +
      '<div class="iw-title">' + report.type + '</div>' +
      '<div class="iw-content">';

if (report.thumb != undefined && report.thumb != null) {
  infoWindowContent += '<img src="data:image/jpeg;base64,' + report.thumb + '" height="115" width="83">';
}
    infoWindowContent += '<p>' + report.description + '</p>'+
    '<p>' + report.origin + '</p>'+
    '</div>' +
      '<div class="iw-bottom-gradient"></div>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,

    });
    this.markers.push(marker);

    google.maps.event.addListener(marker, 'click', () => {
      //infoWindow.open(this.map, marker);

      if (infoWindow.getMap() != null && infoWindow.getMap() != undefined) {
        infoWindow.close();
        this.currentInfoWindow = null;
      }
      else {
        infoWindow.open(this.map, marker);
        if (this.currentInfoWindow) {
          this.currentInfoWindow.close();
        }
        this.currentInfoWindow = infoWindow;
      }
    });

    google.maps.event.addListener(infoWindow, 'domready', function () {
      var iwOuter = $('.gm-style-iw');
      var iwCloseBtn = iwOuter.next();
      iwCloseBtn.css({ display: 'none'});
    });

  }


  addUserMarker() {
    let iconDir = './assets/imgs/pin_2.png';
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon: { url: iconDir },
    });
  }

  public navegarParaAdicionarReport(event): void {
    //this.appCtrl.getRootNav().push("List")
    this.navCtrl.setRoot(CreateReportPage);
  }
}

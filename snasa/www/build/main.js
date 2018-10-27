webpackJsonp([0],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateReportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_report__ = __webpack_require__(876);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_report_service_report_service_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helpers_GPSHelper__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CreateReportPage = /** @class */ (function () {
    function CreateReportPage(navCtrl, navParams, reportService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.reportService = reportService;
        this.loadingCtrl = loadingCtrl;
        this.positionFound = false;
        this.description = '';
        this.type = '';
        this.writingFirebase = false;
        this.reportTypes = [
            { value: "risco", label: "Risk of Fire", image: "./assets/imgs/rubish.png", checked: false },
            { value: "incendio", label: "Fire", image: "./assets/imgs/fire.png", checked: false },
            { value: "Outros", label: "Others", image: "./assets/imgs/smoke.png", checked: false }
        ];
        this.options = {
            quality: 50,
            destinationType: __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].DestinationType.DATA_URL,
            encodingType: __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].EncodingType.JPEG,
            mediaType: __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].MediaType.PICTURE,
            correctOrientation: true
        };
    }
    CreateReportPage.prototype.ngOnInit = function () {
        this.report = new __WEBPACK_IMPORTED_MODULE_3__models_report__["a" /* Report */]();
        this.getLocation();
    };
    CreateReportPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateReportPage');
    };
    CreateReportPage.prototype.getLocation = function () {
        var _this = this;
        //TODO pegar do GPS
        //this.latitude = -22.8938492;
        //this.longitude = -43.1991803;
        var gps = new __WEBPACK_IMPORTED_MODULE_6__helpers_GPSHelper__["a" /* GPSHelper */]();
        gps.getPosition().then(function (pos) {
            _this.latitude = pos.latitude;
            _this.longitude = pos.longitude;
            _this.positionFound = true;
        });
    };
    CreateReportPage.prototype.createReport = function () {
        var loading = this.loadingCtrl.create({
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
        setTimeout(function () {
            self.writingFirebase = false;
            self.description = '';
            self.type = '';
            self.base64Image = '';
            loading.dismiss();
            self.navegarParaHome(null);
        }, 1500);
    };
    CreateReportPage.prototype.navegarParaHome = function (event) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    CreateReportPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        this.options.sourceType = sourceType;
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].getPicture(this.options).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    CreateReportPage.prototype.teste = function () {
    };
    CreateReportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-report',template:/*ion-inline-start:"/home/philippe/Projetos/Node/snasa/src/pages/create-report/create-report.html"*/'  <ion-header>\n  <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    <ion-title>Report incident</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div padding>\n    <ion-list radio-group [(ngModel)]="type" class="list-h">\n        <!-- <ion-list-header class="label-tipo-ocorrencia">\n          Incident Type\n        </ion-list-header> -->\n\n        <ion-item *ngFor="let item of reportTypes">\n          <ion-label>\n              {{item.label}}\n              <br>\n            <img class="fire-type" src="{{item.image}}"/>\n          </ion-label>\n          <ion-radio checked="{{item.checked}}" value="{{item.value}}"></ion-radio>\n        </ion-item>\n      </ion-list>\n  </div>\n\n  <!-- <div padding style="margin-top: -50px;">\n    <ion-item>\n      <ion-label floating class="label-descricao-ocorrencia">Incident description</ion-label>\n      <ion-input type="text" [(ngModel)]="description"></ion-input>\n    </ion-item>\n  </div> -->\n\n  <div padding style="margin-top: -50px;">\n    <ion-item>\n      <ion-label>Incident description</ion-label>\n      <ion-input></ion-input>\n    </ion-item>\n  </div>\n\n  <div padding class="center">\n    <div style="width: 150px; height: auto;">\n        <img [src]="base64Image" *ngIf="base64Image" />\n    </div>\n  </div>\n\n  <div style=" text-align: center">\n      <!-- <button class="red-button" ion-button (click)="takePicture(1)"><ion-icon name="camera"></ion-icon>Image</button>\n      <button class="red-button" ion-button (click)="takePicture(0)"><ion-icon name="images"></ion-icon>Gallery</button> -->\n      <button class="red-button" ion-button (click)="createReport()"><ion-icon name="checkmark"></ion-icon>Send it</button>\n  </div>\n\n  <!-- <div *ngIf="positionFound">\n    <p>{{latitude}}</p>\n    <p>{{longitude}}</p>\n  </div> -->\n\n</ion-content>\n\n\n'/*ion-inline-end:"/home/philippe/Projetos/Node/snasa/src/pages/create-report/create-report.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__services_report_service_report_service_service__["a" /* ReportService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], CreateReportPage);
    return CreateReportPage;
}());

//# sourceMappingURL=create-report.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_service__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_http_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(933);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_GPSHelper__ = __webpack_require__(205);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ReportService = /** @class */ (function (_super) {
    __extends(ReportService, _super);
    function ReportService(http, afs) {
        var _this = _super.call(this, http, 'api') || this;
        _this.afs = afs;
        _this.reportsCollection = afs.collection('reports');
        return _this;
    }
    ReportService.prototype.addReport = function (report) {
        var id = this.afs.createId();
        report.id = id;
        var lat = parseFloat(report.latitude.toString());
        var long = parseFloat(report.longitude.toString());
        report.location = new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["firestore"].GeoPoint(lat, long);
        report.timestamp = (new Date(Date.now())).toISOString();
        var baseurl = "http://snasa.herokuapp.com";
        this.http.post("https://snasa.herokuapp.com/incident", JSON.parse(JSON.stringify(report)));
        //this.reportsCollection.add(JSON.parse(JSON.stringify(report)));
    };
    ReportService.prototype.getReports = function (successAction) {
        var _this = this;
        var gps = new __WEBPACK_IMPORTED_MODULE_5__helpers_GPSHelper__["a" /* GPSHelper */]();
        gps.getPosition().then(function (pos) {
            //let baseurl = window.location.origin;
            var baseurl = "http://snasa.herokuapp.com";
            _this.subscriptions.push(_this.http.get(baseurl + "/incidents?latitude=" + pos.latitude + "&longitude=" + pos.longitude).subscribe(function (data) {
                console.log(data);
                successAction(data.sort(function (a, b) {
                    if (a.datetime > b.datetime)
                        return 1;
                    else if (a.datetime < b.datetime)
                        return -1;
                    else
                        return 0;
                }).reverse());
            }, function (error) {
                console.log;
                (error);
            }));
        });
    };
    ReportService.prototype.getRisk = function (successAction) {
        var _this = this;
        var gps = new __WEBPACK_IMPORTED_MODULE_5__helpers_GPSHelper__["a" /* GPSHelper */]();
        gps.getPosition().then(function (pos) {
            //let baseurl = window.location.origin;
            var baseurl = "http://snasa.herokuapp.com";
            _this.subscriptions.push(_this.http.get(baseurl + "/risk?latitude=" + pos.latitude + "&longitude=" + pos.longitude).subscribe(function (data) {
                console.log(data);
                //{"temperature": 75.26840000000001, "humidity": 56, "pressure": 993.52, "wind": 1.59, "danger": "low"}
                successAction(data);
            }, function (error) {
                console.log;
                (error);
            }));
        });
    };
    ReportService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__core_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], ReportService);
    return ReportService;
}(__WEBPACK_IMPORTED_MODULE_1__base_service__["a" /* BaseService */]));

//# sourceMappingURL=report-service.service.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_report_create_report__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_report_service_report_service_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_GPSHelper__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(939);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, reportService, alertCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.reportService = reportService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.ICONE_REPORT = 1;
        this.ICONE_ELETRICIDADE = 2;
        this.ICONE_PERIGO = 3;
        this.demoReport = [];
        this.subscriptions = [];
        this.markers = [];
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loadMap().then(function () {
            _this.addUserMarker();
            _this.carregarMarcadores();
            _this.carregaRisco();
        });
    };
    HomePage.prototype.carregaRisco = function () {
        var _this = this;
        this.reportService.getRisk(function (risk) {
            var msg = "";
            if (risk.danger === "moderate") {
                msg = "Stay Alert! The weather is very hot and dry there is a potencial risk of fire.";
                setTimeout(function () {
                    var el = document.getElementsByClassName("toast-container")[0];
                    el.style.backgroundColor = "orange";
                }, 30);
            }
            else if (risk.danger === "high") {
                msg = "You are in dangerous area, be carefull with fires.";
                setTimeout(function () {
                    var el = document.getElementsByClassName("toast-container")[0];
                    el.style.backgroundColor = "red";
                }, 30);
            }
            else {
                msg = "You are in safe area!";
                setTimeout(function () {
                    var el = document.getElementsByClassName("toast-container")[0];
                    el.style.backgroundColor = "green";
                }, 30);
            }
            var toast = _this.toastCtrl.create({
                message: msg,
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
        });
    };
    HomePage.prototype.loadMap = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var gps = new __WEBPACK_IMPORTED_MODULE_4__helpers_GPSHelper__["a" /* GPSHelper */]();
            gps.getPosition().then(function (pos) {
                //let latLng = new google.maps.LatLng(-22.8938492, -43.1991803);
                var latLng = new google.maps.LatLng(pos.latitude, pos.longitude);
                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoomControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    mapTypeControl: false
                };
                _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
                resolve();
                // google.maps.event.addListener(this.map, 'click', function () {
                //   console.log(this.currentInfoWindow);
                //   if (this.currentInfoWindow)
                //     this.currentInfoWindow.close();
                // });
            });
        });
    };
    HomePage.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };
    HomePage.prototype.carregarMarcadores = function () {
        var _this = this;
        this.reportService.getReports(function (data) {
            _this.setMapOnAll(null);
            _this.markers = [];
            console.log(data);
            data.forEach(function (report) {
                _this.addMarker(report);
            });
            _this.markerCluster = new MarkerClusterer(_this.map, _this.markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', maxZoom: 19 });
        });
        // this.demoReport.forEach(report=>{
        //   this.addMarker(report)
        // })
    };
    HomePage.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subs) {
            subs.unsubscribe();
        });
    };
    HomePage.prototype.onErrorGeolocation = function () {
        var latLng = new google.maps.LatLng(-22, 9121, -43, 2301);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            streetViewControl: false,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.presentAlert();
    };
    HomePage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Não foi possível obter sua localização. Certifique-se que a localização está habilitada em seu dispositivo.',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    HomePage.prototype.addMarker = function (report) {
        var _this = this;
        var iconDir = "";
        if (report.severity == "Altissima") {
            iconDir = './assets/imgs/death_2.png';
        }
        else {
            iconDir = './assets/imgs/exclamation_2.png';
        }
        console.log(report);
        var marker = new google.maps.Marker({
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
        infoWindowContent += '<p>' + report.description + '</p>' +
            '<p>' + report.origin + '</p>' +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';
        var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
        });
        this.markers.push(marker);
        google.maps.event.addListener(marker, 'click', function () {
            //infoWindow.open(this.map, marker);
            if (infoWindow.getMap() != null && infoWindow.getMap() != undefined) {
                infoWindow.close();
                _this.currentInfoWindow = null;
            }
            else {
                infoWindow.open(_this.map, marker);
                if (_this.currentInfoWindow) {
                    _this.currentInfoWindow.close();
                }
                _this.currentInfoWindow = infoWindow;
            }
        });
        google.maps.event.addListener(infoWindow, 'domready', function () {
            var iwOuter = __WEBPACK_IMPORTED_MODULE_5_jquery__('.gm-style-iw');
            var iwCloseBtn = iwOuter.next();
            iwCloseBtn.css({ display: 'none' });
        });
    };
    HomePage.prototype.addUserMarker = function () {
        var iconDir = './assets/imgs/pin_2.png';
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter(),
            icon: { url: iconDir },
        });
    };
    HomePage.prototype.navegarParaAdicionarReport = function (event) {
        //this.appCtrl.getRootNav().push("List")
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__create_report_create_report__["a" /* CreateReportPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/philippe/Projetos/Node/snasa/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <!-- <ion-title>Se L<span class="vermelho">!</span>ga</ion-title> -->\n    <ion-title class="logo"><img  src="./assets/imgs/logo-white.png"></ion-title>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n  <div #map id="map"></div>\n  <ion-fab bottom right>\n    <button ion-fab id="add-button" (click)="navegarParaAdicionarReport()">\n      <img src="./assets/imgs/fire.svg"/>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/philippe/Projetos/Node/snasa/src/pages/home/home.html"*/
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({}),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_report_service_report_service_service__["a" /* ReportService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GPSHelper; });
var GPSHelper = /** @class */ (function () {
    function GPSHelper() {
    }
    GPSHelper.prototype.getPosition = function () {
        function parse_query_string(query) {
            if (query == undefined || query == null) {
                //return { "latitude": "7.33439", "longitude": "3.8998"}
                return { "latitude": "-22.978705", "longitude": "-43.2318758" };
            }
            var vars = query.split("&");
            var query_string = {};
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                var key = decodeURIComponent(pair[0]);
                var value = decodeURIComponent(pair[1]);
                // If first entry with this name
                if (typeof query_string[key] === "undefined") {
                    query_string[key] = decodeURIComponent(value);
                    // If second entry with this name
                }
                else if (typeof query_string[key] === "string") {
                    var arr = [query_string[key], decodeURIComponent(value)];
                    query_string[key] = arr;
                    // If third or later entry with this name
                }
                else {
                    query_string[key].push(decodeURIComponent(value));
                }
            }
            return query_string;
        }
        return new Promise(function (resolve, reject) {
            var q = window.location.href.split("?")[1];
            resolve(parse_query_string(q));
        });
    };
    return GPSHelper;
}());

//# sourceMappingURL=GPSHelper.js.map

/***/ }),

/***/ 216:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 216;

/***/ }),

/***/ 261:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 261;

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_http_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BaseService = /** @class */ (function () {
    function BaseService(http, controller) {
        this.http = http;
        this.controller = controller;
        this.serverURL = "https://randomuser.me/";
        this.baseURL = this.serverURL + this.controller;
        this.subscriptions = [];
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json;');
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
    }
    BaseService.prototype.unsubscribeAll = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        this.subscriptions.length = 0;
    };
    BaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__core_http_service__["a" /* HttpService */], String])
    ], BaseService);
    return BaseService;
}());

//# sourceMappingURL=base.service.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PerfilPage = /** @class */ (function () {
    function PerfilPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-perfil',template:/*ion-inline-start:"/home/philippe/Projetos/Node/snasa/src/pages/perfil/perfil.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Profile</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div class="wrap-profile">\n        <div class="profile">\n            <ion-card>\n                <ion-card-content class="card-perfil">\n                    <ion-card-title>\n                        Basic information\n                    </ion-card-title>\n                    <div class="perfil-classificacao">\n                        <!-- <ion-icon menuClose name="contact" class="foto-perfil"></ion-icon> -->\n                        <div class="container-classificacao">\n                            <ion-icon name="star" class="classificacao" class="red-icon"></ion-icon>\n                            <ion-icon name="star" class="classificacao" class="red-icon"></ion-icon>\n                            <ion-icon name="star" class="classificacao" class="red-icon"></ion-icon>\n                            <ion-icon name="star-half" class="classificacao" class="red-icon"></ion-icon>\n                            <ion-icon name="star-outline" class="classificacao" class="red-icon"></ion-icon>\n                        </div>\n                    </div>\n                    <div class="texto-info-basicas">\n                        <div class="nome">André Luiz Melo</div>\n                        <div class="email">andre.melo@radixeng.com.br</div>\n                        <div class="telefone">(21) 5555555</div>\n                    </div>\n                </ion-card-content>\n            </ion-card>\n            <ion-card>\n                <ion-card-content class="recompensas">\n                    <!-- <ion-card-title>\n                        My rewards\n                    </ion-card-title> -->\n                    <div>\n                        <span class="pontos">327</span> Points\n                    </div>\n                    <div class="ultimo-mes">\n                        <div><span class="enviados">12</span> incidents reported in the last month</div>\n                        <div><span class="validados">8</span> incidents confirmed in the last month</div>\n                    </div>\n                </ion-card-content>\n            </ion-card>\n        </div>\n        <div class="bg-profile">\n            \n        </div>\n\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/philippe/Projetos/Node/snasa/src/pages/perfil/perfil.html"*/
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            providers: []
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], PerfilPage);
    return PerfilPage;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_report_service_report_service_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_report_create_report__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FeedPage = /** @class */ (function () {
    function FeedPage(navCtrl, reportService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.reportService = reportService;
        this.loadingCtrl = loadingCtrl;
        this.reportsDaVizinhanca = [];
        this.loader = this.loadingCtrl.create({
            content: "Buscando registros...",
            duration: 10000,
            dismissOnPageChange: true
        });
        this.carregando = true;
    }
    FeedPage.prototype.ngOnInit = function () {
        var _this = this;
        this.carregando = true;
        this.loader.present();
        this.reportService.getReports(function (data) {
            _this.reportsDaVizinhanca = data;
            _this.reportsDaVizinhanca = _this.reportsDaVizinhanca.slice();
            _this.carregando = false;
            _this.loader.dismiss();
        });
    };
    Object.defineProperty(FeedPage.prototype, "naoHaReports", {
        get: function () {
            return (this.reportsDaVizinhanca == null || this.reportsDaVizinhanca.length == 0) && !this.carregando;
        },
        enumerable: true,
        configurable: true
    });
    FeedPage.prototype.iconName = function (item, up) {
        if (up) {
            if (item.mylike != null && item.mylike > 0)
                return "ios-thumbs-up";
            else
                return "ios-thumbs-up-outline";
        }
        else {
            if (item.mylike != null && item.mylike < 0)
                return "ios-thumbs-down";
            else
                return "ios-thumbs-down-outline";
        }
    };
    FeedPage.prototype.outline = function (item, up) {
        if (up) {
            return !(item.mylike != null && item.mylike > 0);
        }
        else {
            return !(item.mylike != null && item.mylike < 0);
        }
    };
    FeedPage.prototype.changeLike = function (item, up) {
        if (up) {
            if (item.mylike != null && item.mylike > 0)
                item.mylike = 0;
            else
                item.mylike = 1;
        }
        else {
            if (item.mylike != null && item.mylike < 0)
                item.mylike = 0;
            else
                item.mylike = -1;
        }
    };
    FeedPage.prototype.navegarParaAdicionarReport = function (event) {
        //this.appCtrl.getRootNav().push("List")
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__create_report_create_report__["a" /* CreateReportPage */]);
    };
    FeedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-feed',template:/*ion-inline-start:"/home/philippe/Projetos/Node/snasa/src/pages/feed/feed.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Feed</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ng-container *ngIf="naoHaReports">\n        <h2>No incident reported until now :(</h2>\n    </ng-container>\n    <ion-card *ngFor="let item of reportsDaVizinhanca" class="feed-card">\n        <ion-card-content class="">\n            <ion-card-title>\n              {{item.type}}\n            </ion-card-title>\n            <div class="feed-img">\n                <img [src]="item.url"/>\n            </div>\n            <div class="feed-direita">\n                <div class="feed-desc">\n                {{item.description}}\n                </div>\n                <div class="feed-vote">\n                    <ng-container *ngIf="outline(item, true)">\n                        <button ion-button outline color="secondary" (click)="changeLike(item,true)"><ion-icon [name]="iconName(item,true)"></ion-icon></button>\n                    </ng-container>\n                    <ng-container *ngIf="!outline(item, true)">\n                        <button ion-button color="secondary" (click)="changeLike(item,true)"><ion-icon [name]="iconName(item,true)"></ion-icon></button>\n                    </ng-container>\n\n                    <ng-container *ngIf="outline(item, false)">\n                        <button ion-button outline color="danger" (click)="changeLike(item,false)"><ion-icon [name]="iconName(item,false)"></ion-icon></button>\n                    </ng-container>\n                    <ng-container *ngIf="!outline(item, false)">\n                        <button ion-button color="danger" (click)="changeLike(item,false)"><ion-icon [name]="iconName(item,false)"></ion-icon></button>\n                    </ng-container>\n                </div>\n            </div>\n        </ion-card-content>\n    </ion-card>\n    <ion-fab bottom right>\n        <button ion-fab id="add-button" (click)="navegarParaAdicionarReport()">\n          <ion-icon name="add"></ion-icon>\n        </button>\n      </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/philippe/Projetos/Node/snasa/src/pages/feed/feed.html"*/
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            providers: [__WEBPACK_IMPORTED_MODULE_2__services_report_service_report_service_service__["a" /* ReportService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_report_service_report_service_service__["a" /* ReportService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], FeedPage);
    return FeedPage;
}());

//# sourceMappingURL=feed.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(554);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(940);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_test_service_test_service__ = __webpack_require__(941);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_core_module__ = __webpack_require__(942);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_create_report_create_report__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_perfil_perfil__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_report_service_report_service_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2_firestore__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__firebase_config__ = __webpack_require__(944);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_feed_feed__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_fcm__ = __webpack_require__(945);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_create_report_create_report__["a" /* CreateReportPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_feed_feed__["a" /* FeedPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_9__core_core_module__["a" /* CoreModule */],
                __WEBPACK_IMPORTED_MODULE_14_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_15__firebase_config__["a" /* firebaseConf */]),
                __WEBPACK_IMPORTED_MODULE_13_angularfire2_firestore__["b" /* AngularFirestoreModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_create_report_create_report__["a" /* CreateReportPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_feed_feed__["a" /* FeedPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__services_test_service_test_service__["a" /* TestService */],
                __WEBPACK_IMPORTED_MODULE_12__services_report_service_report_service_service__["a" /* ReportService */],
                __WEBPACK_IMPORTED_MODULE_13_angularfire2_firestore__["a" /* AngularFirestore */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_fcm__["a" /* FCM */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_create_report_create_report__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_perfil_perfil__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_feed_feed__ = __webpack_require__(548);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { ListPage } from '../pages/list/list';



var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.openNotifications = false;
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], icon: "home" },
            //{ title: 'List', component: ListPage },
            { title: 'Report incident', component: __WEBPACK_IMPORTED_MODULE_5__pages_create_report_create_report__["a" /* CreateReportPage */], icon: "add" },
            { title: 'Feed', component: __WEBPACK_IMPORTED_MODULE_7__pages_feed_feed__["a" /* FeedPage */], icon: 'paper' }
        ];
    }
    MyApp.prototype.ngOnInit = function () {
        this.initializeApp();
    };
    MyApp.prototype.ngAfterViewInit = function () {
        this.openNotifications = true;
    };
    MyApp.prototype.initializeApp = function () {
        // this.platform.ready().then(() => {
        //   this.fcm.subscribeToTopic('topic');
        //   this.fcm.getToken().then(token => {
        //     console.log(token);
        //     // backend.registerToken(token);
        //   });
        //   this.fcm.onNotification().subscribe(data => {
        //     if(data.wasTapped){
        //       console.log("Received in background");
        //     } else {
        //       console.log("Received in foreground");
        //     };
        //   });
        //   this.fcm.onTokenRefresh().subscribe(token => {
        //     console.log(token);
        //     // backend.registerToken(token);
        //   });
        //Notifications
        // this.fcm.subscribeToTopic('topic');
        // this.fcm.getToken().then(token => {
        //   console.log(token);
        // });
        // this.fcm.onNotification().subscribe(data => {
        //   if (data.wasTapped) {
        //     console.log("Received in background");
        //   } else {
        //     console.log("Received in foreground");
        //   };
        // });
        // this.fcm.onTokenRefresh().subscribe(token => {
        //   console.log(token);
        // });
        //end notifications.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        // });
        // },(error)=>{console.log(error)});
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.navegarParaMeuPerfil = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_perfil_perfil__["a" /* PerfilPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/philippe/Projetos/Node/snasa/src/app/app.html"*/'<ion-menu [content]="content" class="menu">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <div class="secao-perfil-menu">\n        <ion-icon menuClose name="contact" (click)="navegarParaMeuPerfil()" class="foto-perfil"></ion-icon>\n        <button ion-button menuClose (click)="navegarParaMeuPerfil()" class="botao-meuperfil">My profile</button>\n    </div>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)" class="menu-button">\n        <ng-container *ngIf="p.icon">\n          <ion-icon [name]="p.icon" class="menu-icon"></ion-icon>\n        </ng-container>\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- <div style="display: none;" *ngIf="openNotifications"></div> -->\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/philippe/Projetos/Node/snasa/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HttpService = /** @class */ (function (_super) {
    __extends(HttpService, _super);
    //   public token: string;
    //   apiUrl = 'http://example.com/api/';
    function HttpService(backend, defaultOptions) {
        return _super.call(this, backend, defaultOptions) || this;
    }
    HttpService.prototype.post = function (url, element, options) {
        var _this = this;
        //this.showLoader();
        return _super.prototype.post.call(this, url, element, this.requestOptions(options))
            .map(this.extractData)
            .catch(this.handleErrorObservable)
            .finally(function () {
            _this.onEnd();
        });
    };
    HttpService.prototype.get = function (url, options, blockTela) {
        var _this = this;
        if (blockTela === void 0) { blockTela = true; }
        //if(blockTela) this.showLoader();
        return _super.prototype.get.call(this, url, this.requestOptions(options))
            .map(this.extractData)
            .catch(this.handleErrorObservable)
            .finally(function () {
            _this.onEnd();
        });
    };
    HttpService.prototype.requestOptions = function (options) {
        if (options == null) {
            options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        }
        if (options.headers == null) {
            options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    };
    // private onCatch(error: any, caught: Observable<any>): Observable<any> {
    //   return Observable.throw(error);
    // }
    // private onSuccess(res: Response): void {
    //   console.log('Request successful');
    // }
    // private onError(res: Response): void {
    //   console.log('Error, status code: ' + res.status);
    // }
    HttpService.prototype.onEnd = function () {
        //TODO 
    };
    HttpService.prototype.extractData = function (res) {
        try {
            var body = res.json();
            return body;
        }
        catch (e) {
            console.log(e);
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw('Falha de comunicação!');
        }
    };
    HttpService.prototype.handleErrorObservable = function (error) {
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.message || error);
    };
    HttpService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* XHRBackend */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]])
    ], HttpService);
    return HttpService;
}(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]));

//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ 876:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Report; });
var Report = /** @class */ (function () {
    function Report() {
        this.timestamp = "";
        this.username = 'Cidadão Preocupado';
    }
    ;
    return Report;
}());

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/home/philippe/Projetos/Node/snasa/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/philippe/Projetos/Node/snasa/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 941:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_http_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_service__ = __webpack_require__(530);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TestService = /** @class */ (function (_super) {
    __extends(TestService, _super);
    function TestService(http) {
        var _this = _super.call(this, http, 'api') || this;
        _this.testURL = _this.baseURL + "/";
        return _this;
    }
    TestService.prototype.test = function (successAction, errorAction) {
        console.log("entrei no teste");
        var observable = this.http.get(this.testURL);
        this.subscriptions.push(observable.subscribe(function (data) {
            console.log("sucesso");
            successAction(data);
        }, function (error) {
            console.log("errou");
            errorAction(error);
        }));
    };
    TestService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__core_http_service__["a" /* HttpService */]])
    ], TestService);
    return TestService;
}(__WEBPACK_IMPORTED_MODULE_2__base_service__["a" /* BaseService */]));

//# sourceMappingURL=test-service.js.map

/***/ }),

/***/ 942:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__http_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__factories_http_service_factory__ = __webpack_require__(943);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */]
            ],
            exports: [],
            declarations: [],
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_0__http_service__["a" /* HttpService */],
                    useFactory: __WEBPACK_IMPORTED_MODULE_1__factories_http_service_factory__["a" /* httpServiceFactory */],
                    deps: [__WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* XHRBackend */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]]
                }
            ]
        })
    ], CoreModule);
    return CoreModule;
}());

//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ 943:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return httpServiceFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_http_service__ = __webpack_require__(81);

function httpServiceFactory(backend, options) {
    return new __WEBPACK_IMPORTED_MODULE_0__core_http_service__["a" /* HttpService */](backend, options);
}

//# sourceMappingURL=http-service.factory.js.map

/***/ }),

/***/ 944:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConf; });
var firebaseConf = {
    apiKey: "AIzaSyD9NEf34Tiz8a1UYQsIGKIAfSrdi_ULA0o",
    authDomain: "seliga-hackingrio.firebaseapp.com",
    databaseURL: "https://seliga-hackingrio.firebaseio.com",
    projectId: "seliga-hackingrio",
    storageBucket: "seliga-hackingrio.appspot.com",
    messagingSenderId: "718931242065"
};
//# sourceMappingURL=firebase.config.js.map

/***/ })

},[549]);
//# sourceMappingURL=main.js.map
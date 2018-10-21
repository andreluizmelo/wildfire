import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
import { CreateReportPage } from '../pages/create-report/create-report';
import { PerfilPage } from '../pages/perfil/perfil';

import { FeedPage } from '../pages/feed/feed';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, AfterViewInit {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon?: string}>;

  public openNotifications: boolean = false;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

    this.pages = [
      { title: 'Home', component: HomePage, icon: "home" },
      //{ title: 'List', component: ListPage },
      { title: 'Report incident', component: CreateReportPage, icon: "add" },
      { title: 'Feed', component: FeedPage, icon: 'paper'}
    ];

  }

  ngOnInit(){
    this.initializeApp();
  }

  ngAfterViewInit(): void {
    this.openNotifications = true;
  }

  initializeApp() {
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
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
  navegarParaMeuPerfil(){
    this.nav.setRoot(PerfilPage)
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TestService } from '../services/test-service/test-service';

import { CoreModule } from '../core/core.module';
import { CreateReportPage } from '../pages/create-report/create-report';
import { PerfilPage } from '../pages/perfil/perfil';
import { ReportService } from '../services/report-service/report-service.service';

import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { firebaseConf } from './firebase.config';
import { FeedPage } from '../pages/feed/feed';
import { FCM } from '@ionic-native/fcm';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CreateReportPage,
    PerfilPage,
    FeedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CoreModule,
    AngularFireModule.initializeApp(firebaseConf),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CreateReportPage,
    PerfilPage,
    FeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TestService,
    ReportService,
    AngularFirestore,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

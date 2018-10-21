import { Component, OnInit } from "@angular/core";
import { FCM } from "@ionic-native/fcm";

@Component({
    templateUrl: 'app.html'
  })

export class NotificationsComponent implements OnInit{
    
    constructor(private fcm: FCM){}

    ngOnInit(): void {
        this.initializeApp();
    }

    initializeApp() {
        this.fcm.subscribeToTopic('topic');
        
        this.fcm.getToken().then(token => {
            console.log(token);
            // backend.registerToken(token);
        });
        
        this.fcm.onNotification().subscribe(data => {
            if(data.wasTapped){
                console.log("Received in background");
            } else {
                console.log("Received in foreground");
            };
        });
        
        this.fcm.onTokenRefresh().subscribe(token => {
            console.log(token);
        });
      }
}
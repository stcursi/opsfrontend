import { Injectable, NgZone } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { MessageProvider } from '../providers/message-provider';
import { Auth } from '../providers/auth';
import { Message } from '../models/Message';
import { User } from '../models/User'

import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  currentUser: User;

  messReceived: Message[];
  trovati: false;

  constructor(public zone: NgZone, public backgroundGeolocation: BackgroundGeolocation,
   public alertCtrl: AlertController, public messProvider: MessageProvider, public authProvider: Auth) {
    this.messReceived = new Array<Message>();

  }

  startTracking() {
    // Background Tracking

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 5000
    };

     this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      this.currentUser = this.authProvider.getCurrentUser();

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });

      var LatLng = { lat: location.latitude, lng: location.longitude };

      this.messProvider.getLocatedMessage(this.currentUser._id, LatLng).subscribe(message => {
        console.log(message);
        this.messReceived = message;

        this.messReceived.forEach(element => {
          var testo = "Il tuo amico " + element.sender + "ti ha lasciato un messaggio";
          this.showPopup("Nuovo messaggio", testo);
        })

        this.aggiornaMessaggi(this.messReceived);

      })


    }, (err) => {

      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();

    // // Foreground Tracking

    // let options = {
    //   frequency: 3000,
    //   enableHighAccuracy: true
    // };

    // this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

    //   console.log(position);

    //   // Run update inside of Angular's zone
    //   this.zone.run(() => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //   });

    // });

  }

  stopTracking() {
    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();

  }

  aggiornaMessaggi(messaggi: Message[]) {
    messaggi.forEach(element => {
      element.text += "trovato";
      element.received = true;
      this.messProvider.updateMessage(element).subscribe(response => {
        console.log(response);
      });
    })
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          // handler: data => {
          //   if (this.trovati) {
          //     this.navCtrl.popToRoot();
          //   }
          // }
        }
      ]
    });
    alert.present();
  }


}
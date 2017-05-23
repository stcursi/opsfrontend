import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LocationTracker } from '../providers/location-tracker';

import { LoginPage } from '../pages/login-page/login-page';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, public locationTracker: LocationTracker) {
    platform.ready().then(() => {
      StatusBar.styleDefault();


      this.locationTracker.startTracking();

    });
  }
}
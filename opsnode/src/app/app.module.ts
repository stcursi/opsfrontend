import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { MapPage } from '../pages/map/map';
import { Friends } from '../pages/friends/friends';
import { MessagePage } from '../pages/message/message';
import { Pending } from '../pages/pending/pending';
import { Profile } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';

import { Auth } from '../providers/auth';
import { Todos } from '../providers/todos';
import { MessageProvider } from '../providers/message-provider';
import { FriendsProvider } from '../providers/friends-provider';
import { LocationTracker } from '../providers/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    Friends,
    SignupPage,
    Profile,
    MapPage,
    MessagePage,
    Pending,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    SignupPage,
    Friends,
    Profile,
    MapPage,
    MessagePage,
    Pending,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Storage,
    MessageProvider,
    BackgroundGeolocation,
    FriendsProvider,
    LocationTracker,
    Todos,
    Auth,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

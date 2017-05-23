import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Loading, ModalController } from 'ionic-angular';
import { Geolocation, PositionError, Geoposition } from 'ionic-native';
import { User } from '../../models/User';
import { Message } from '../../models/Message';
import { MessageProvider } from '../../providers/message-provider';
import { Auth } from '../../providers/auth';
import { MessagePage } from '../message/message';
import { HomePage } from '../home/home';
import { LocationTracker } from '../../providers/location-tracker';


import L from "leaflet";

const OPT_GEOLOCATION = { maximumAge: 12000, timeout: 60 * 60 * 1000, enableHighAccuracy: true };

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map: any;
  nav: any;
  modal: any;
  center: { lat: number, lng: number };
  marker: L.Marker;
  currentUser: User;
  loading: Loading;
  subscription: any;

  messReceived: Message[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public modCtrl: ModalController, public locationTracker: LocationTracker,
    public authService: Auth, public messageProvider: MessageProvider) {

    this.nav = navCtrl;
    this.modal = modCtrl;
    this.currentUser = authService.getCurrentUser();

    this.messReceived = new Array<Message>();

  }

  ionViewDidLoad() {

    this.showLoading();

    this.geoSet();

    this.initMap();

    this.loading.dismiss().catch(() => { });
    // when no map, maybe to use this workaround:
    //setTimeout(this.loadMap.bind(this), 100);

  }

  initMap() {

    this.map = L.map('map', {
      center: this.center,
      zoom: 15
    }).on('contextmenu', this.presentModal.bind(this));

    //Add OSM Layer
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);

    //Draw marker
    this.updateMarker(this.center);

    //RecuperaMessaggiUtenti
    this.messageProvider.getReceivedMessage(this.currentUser).subscribe(response => {
      console.log(response)
      this.messReceived = response;
      this.showMyMessage();
    });

  }

  geoSet() {

    var geoposition = null;

    console.log("entrato in geoSet");

    this.subscription = Geolocation.watchPosition(OPT_GEOLOCATION).subscribe(data => {
      if ((data as Geoposition).coords === undefined) {
        this.errorToast({ code: 31071990, message: "coordinate undefined" });
        //case: data = Geoposition
      } else {
        geoposition = (data as Geoposition);
        let latlng = { lat: geoposition.coords.latitude, lng: geoposition.coords.longitude };
        this.center = latlng;
        this.updateMarker(latlng);
        this.map.panTo(latlng);

        this.map.locate({
          setView: true,
          maxZoom: 16,
          whatch: true,
          timeout: 10000,
          enableHighAccuracy: true
        });

      }
    })
  }

  showMyMessage() {
    this.messReceived.forEach(element => {
      if (element.received) {
        let latleng = new L.LatLng(element.geo[0], element.geo[1]);
        // console.log(latleng);
        let markerIcon = new L.Icon({
          iconUrl: "../../assets/images/gift.png",
          shadowUrl: "../../assets/images/marker-shadow.png"
        })
        let marker = L.marker(latleng).setIcon(markerIcon);

        marker.addTo(this.map);

      } else {
        //DEVONO ANCORA ESSERE SCOPERTI SHSHSHSH !!!!
      }

    });
  }

  updateMarker(latlng: { lat: number, lng: number }) {
    if (this.marker) {
      this.marker = this.marker.setLatLng(latlng);
    } else {
      this.marker = L.marker(latlng).addTo(this.map);
    }

  }

  toggleFollow() {
    // if (!this.following) {
    //   if (!Geolocation || !Geolocation.watchPosition) {
    //     this.errorToast({ code: 901, message: "no Geolocation available" });
    //   }

    //   this.subscription = Geolocation.watchPosition(OPT_GEOLOCATION).subscribe(data => {
    //     //case: data = PositionError
    //     if ((data as Geoposition).coords === undefined) {
    //       this.errorToast({ code: 31071990, message: (data.coords.longitude + ' ' + data.coords.latitude) });

    //       //case: data = Geoposition
    //     } else {
    //       var geoposition = (data as Geoposition);
    //       let latlng = { lat: geoposition.coords.latitude, lng: geoposition.coords.longitude };
    //       this.center = latlng;
    //       this.updateMarker(latlng);
    //       this.map.panTo(latlng);
    //     }
    //   })
    //   //follow not disabled: stop follow
    // } else {
    //   this.subscription.unsubscribe();
    // }
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Where are you?...'
    });
    this.loading.present();
  }

  presentModal(e) {
    let myModal = this.modal.create(MessagePage, { User: this.currentUser, Latlng: e.latlng });
    myModal.present(myModal);
  }


  errorToast(error: PositionError) {
    console.log('Error ' + error.message);
    let toast = this.toastCtrl.create({
      message: 'Error: ' + error.message,
      showCloseButton: true
    });
    toast.present();
  }

}


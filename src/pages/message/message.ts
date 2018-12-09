import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NavController, ViewController, AlertController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { Slides } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Camera } from 'ionic-native';
import { MapPage } from '../map/map';
import { MessageProvider } from '../../providers/message-provider';

import { FriendsProvider } from '../../providers/friends-provider';

/*
  Generated class for the Message page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  @ViewChild(Slides) slides: Slides;

  // auth and general const
  currentUser: User;
  latlng: any;

  // users const
  setToPrint: User[];
  _userFriends: User[];
  _currentReceiver: User;  
  receiverName: string;

  // searching const
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;

  // media const
  cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;

  // text message const
  textMessage: string;

  createSuccess = false;

  constructor(public navCtrl: NavController, public view: ViewController, public messageProvider: MessageProvider,
    public navParams: NavParams, public alertCtrl: AlertController, public friendsProvider: FriendsProvider) {
    if (navParams.get('User') != undefined) {
      this.searchControl = new FormControl();
      this.currentUser = navParams.get('User');
      this.latlng = navParams.get('Latlng');
    }

    this._userFriends = new Array<User>();
    this.setToPrint = new Array<User>();
  }


  cancel() {
    this.view.dismiss();
  }

  ionViewDidLoad() {

    if (this._userFriends.length == 0) {
      this.friendsProvider.getAllUsers().subscribe(response => {
        this._userFriends = response;
        if (this._userFriends.length != 0) {
          this.setToPrint = this.filterItems(this.searchTerm);
        }
      });
    }

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setToPrint = this.filterItems(this.searchTerm);
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  filterItems(searchTerm) {
    if (searchTerm) {
      return this._userFriends.filter((user) => {
        return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    } else {
      return this._userFriends;
    }
  }

  selectFromGallery() {
    var options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI
    };
    Camera.getPicture(options).then((imageData) => {
      this.cameraUrl = imageData;
      this.photoSelected = true;
      this.photoTaken = false;
    }, (err) => {
      console.log('errore carica foto');
      alert(err);
    });
    
  }

  openCamera() {
    var options = {
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.DATA_URL
    };
    Camera.getPicture(options).then((imageData) => {
      this.cameraData = 'data:image/jpeg;base64,' + imageData;
      this.photoTaken = true;
      this.photoSelected = false;
    }, (err) => {
      alert(err);
    });
  }

  selectFriend(friend: User) {
    this._currentReceiver = friend;
    this.receiverName = this._currentReceiver.name;
    console.log("lo stronzo è " + this._currentReceiver.name)
    this.slides.slideNext();
  }

  saveMessage() {

    this.messageProvider.saveNewMessage(this.latlng, this.currentUser._id, this._currentReceiver._id, "ciaooo stronzoniii").then((response) => {
      if (response) {
        this.createSuccess = true;
        this.showPopup("Success", "Message saved.");
        console.log(response)
      } else {
        this.showPopup("Error", "Problem saving message.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}

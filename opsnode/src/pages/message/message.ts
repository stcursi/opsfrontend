import { Component } from '@angular/core';
import { NavController, ViewController, AlertController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { Camera } from 'ionic-native';
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

  currentUser: User;
  currentReceiver: User;
  latlng: any;
  usersFriends: User[];

  cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;

  createSuccess = false;

  constructor(public navCtrl: NavController, public view: ViewController, public messageProvider: MessageProvider,
    public navParams: NavParams, public alertCtrl: AlertController, public friendsProvider: FriendsProvider) {
    if (navParams.get('User') != undefined) {
      this.currentUser = navParams.get('User');
      this.latlng = navParams.get('Latlng');
    }

    this.usersFriends = new Array<User>();
  }

  cancel() {
    this.view.dismiss();
  }

  ionViewDidLoad() {

    this.friendsProvider.getAllUsers().subscribe(response =>{
      this.usersFriends = response;
    });

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

  select_item(friend: User) {
    this.currentReceiver = friend;
    console.log("lo stronzo è " + this.currentReceiver.name)
  }

  saveMessage() {

    this.messageProvider.saveNewMessage(this.latlng, this.currentUser._id, this.currentReceiver._id, "ciaooo stronzoniii").then((response) => {
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

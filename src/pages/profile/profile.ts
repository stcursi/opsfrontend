import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { User } from '../../models/user';

import { LoginPage } from '../login-page/login-page';
import { Friends } from '../friends/friends';
import { Pending } from '../pending/pending';
import { Auth } from '../../providers/auth';
import { FriendsProvider } from '../../providers/friends-provider';
import { Friendship } from "../../models/Friendship";

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  currentUser: User;
  setFriends: Friendship[];
  friends: User[];
  requests: User[];

  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController,
    public friendProvider: FriendsProvider, public navParams: NavParams) {

    this.currentUser = authService.getCurrentUser();
    this.setFriends = new Array<Friendship>();
    this.friends = new Array<User>();
    this.requests = new Array<User>();

    let loader = this.loadingCtrl.create({
      content: 'Getting latest entries...',
    });

    loader.present().then(() => {

      this.getAllFriends();

      this.getAllRequests();

      loader.dismiss();
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');

  }

  getAllFriends() {

    let details = {
      _id: this.currentUser._id,
      accepted: true
    }
    console.log("amici");

    this.friendProvider.getAllFriends(details).subscribe(response => {
      console.log(response);
      this.setFriends = response;
      this.usersFromSubscribes(this.setFriends, false)
    })

  }

  getAllRequests() {

    let details = {
      _id: this.currentUser._id,
      accepted: false
    }
    console.log("richieste di amicizia ");

    this.friendProvider.getPendingRequests(details).subscribe(response => {
      console.log(response);
      this.setFriends = response;
      this.usersFromSubscribes(this.setFriends, true)
    })
  }

  usersFromSubscribes(set: Friendship[], pending: Boolean) {

    let arrayIds = []
    set.forEach(element => {
      arrayIds.push(element.request_to)
    })


    this.friendProvider.getUsersFromFriends(arrayIds).subscribe(response => {
      if (pending) {
        console.log(response)
        this.requests = response;
      } else {
        this.friends = response;
      }
    })
  }

  showFriends() {
    this.navCtrl.push(Friends, {
      all_friends: this.friends
    });
  }

  showFriendRequest() {
    this.navCtrl.push(Pending, {
      pending_users : this.requests,
      pending_friendship : this.setFriends
    })
  }


  logout() {

    console.log("entrato")
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);

  }

}

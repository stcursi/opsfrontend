import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { Friendship } from '../../models/friendship';

import { FriendsProvider } from '../../providers/friends-provider';
import { Auth } from '../../providers/auth';

/**
 * Generated class for the Pending page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
})
export class Pending {

  items: User[];
  friendships: Friendship[];
  currentUser: User;

  constructor(public navCtrl: NavController, public authCtrl: Auth, public friendsCtrl: FriendsProvider,
    public navParams: NavParams) {

    this.currentUser = authCtrl.getCurrentUser();

    if (navParams.get('pending_users') != null) {
      this.items = navParams.get('pending_users')
    } else {
      this.items = new Array<User>();
    }

    if (navParams.get('pending_friendship') != null) {
      this.friendships = navParams.get('pending_friendship')
    } else {
      this.friendships = new Array<Friendship>();
    }


  }

  ionViewDidLoad() {

  }

  acceptRequest(item: User) {

    this.friendships.forEach(element => {
      if ((element.friend_id == this.currentUser._id) && (element.request_to == item._id)) {
        element.accepted = true;
        this.friendsCtrl.acceptFriendRequest(element).subscribe(response => {
          let index: number = this.items.indexOf(item);
          if (index !== -1) {
            this.items.splice(index, 1);
          }
        })
      }
    })

  }

}

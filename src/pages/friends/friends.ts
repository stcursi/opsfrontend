import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

import { FriendsProvider } from '../../providers/friends-provider';
import { Auth } from '../../providers/auth';
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class Friends {

  currentUser: User;
  searchTerm: string = '';
  searchControl: FormControl;
  items: User[];
  searching: any = false;

  constructor(public navCtrl: NavController, public friendsProvider: FriendsProvider,
    public authService: Auth, public navParams: NavParams) {
    this.searchControl = new FormControl();

    this.currentUser = authService.getCurrentUser();

    if (navParams.get('all_friends') != null) {
      this.items = navParams.get('all_friends')
    } else {
      this.items = new Array<User>();
    }

  }

  ionViewDidLoad() {

    if (this.items.length == 0) {
      this.friendsProvider.getAllUsers().subscribe(response => {
        this.items = response

        console.log(this.items);

        if (this.items.length != 0) {
          this.setFilteredItems();
        }

      })
    } else {

      this.setFilteredItems();
    }


    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

      this.searching = false;
      this.setFilteredItems();

    });

  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.items = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {

    return this.items.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  sendRequest(friend: User){

    console.log(friend._id + " aaaa " + this.currentUser._id);

     let details = {
       request_to: this.currentUser._id,
       friend_id: friend._id
     }

     this.friendsProvider.sendFriendRequest(details).subscribe(response =>{
       console.log(response);
     })
  }


}

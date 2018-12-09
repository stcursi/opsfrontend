import { Component } from '@angular/core';

import { Friends } from '../friends/friends';

import { MapPage } from '../map/map';
import { Profile } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = Profile;
  tab3Root = Friends;

  constructor() {

  }
}

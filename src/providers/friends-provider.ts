import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { HttpController } from "./http-controller";
import { User } from "../models/User";
import { Friendship } from "../models/Friendship";


/*
  Generated class for the FriendsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FriendsProvider {

  //  public urlService = 'http://opsbe20170228120912.azurewebsites.net/';
  // // public urlService = 'http://192.168.1.8:80/';

  constructor(public http: Http) { }


  public getAllUsers(): Observable<User[]> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('https://opsbackend.herokuapp.com/api/friendship/getallusers', { headers: headers }).map(
      res => <User[]>(res.json())
    ).catch((error: any) => Observable.throw(error.json().error || 'Server error'))

  }

  public getAllFriends(details): Observable<Friendship[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://opsbackend.herokuapp.com/api/friendship/getallfriends', JSON.stringify(details), { headers: headers }).map(
      res => <Friendship[]>(res.json())
    ).catch((error: any) => Observable.throw(error.json().error || 'Server error'))

  }

  public getPendingRequests(details): Observable<Friendship[]> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://opsbackend.herokuapp.com/api/friendship/getpendingfriends', JSON.stringify(details), { headers: headers }).map(
      res => <Friendship[]>(res.json())
    ).catch((error: any) => Observable.throw(error.json().error || 'Server error'))

  }

  public getUsersFromFriends(details): Observable<User[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://opsbackend.herokuapp.com/api/friendship/getusersfromfriends', JSON.stringify(details), { headers: headers }).map(
      res => <User[]>(res.json())
    ).catch((error: any) => Observable.throw(error.json().error || 'Server error'))

  }

  public acceptFriendRequest(details: any) {

    let friendship = {
      id: "",
      friend_id: details.friend_id,
      request_to: details.request_to,
      accepted: true
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://opsbackend.herokuapp.com/api/friendship/acceptfriendrequest', JSON.stringify(details), { headers: headers }).map(
      res => <User[]>(res.json())
    ).catch((error: any) => Observable.throw(error.json().error || 'Server error'))


  }


  public sendFriendRequest(details): Observable<Friendship> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://opsbackend.herokuapp.com/api/friendship/sendfriendrequest', JSON.stringify(details), { headers: headers }).map(
      res => <Friendship>(res.json())
    ).catch((error: any) => Observable.throw(error.json().error || 'Server error'))

  } ƒ
}

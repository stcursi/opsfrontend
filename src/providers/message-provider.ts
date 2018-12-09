import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { Message } from "../models/Message";

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class MessageProvider {

  constructor(public http: Http) { }

  saveNewMessage(Latlng: any, sender: string, receiver: string, text: string) {

    return new Promise((resolve, reject) => {

      let array = {
        longitude: Latlng.lng,
        latitude: Latlng.lat,
        photo: null,
        received: false,
        read: false,
        sender: sender,
        receiver: receiver,
        text: text,
        creationDateUtc: null,
        reception: null,
        lastUpdateDateUtc: null
      }

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      //   console.log(sender + " - " + receiver);

      console.log(array)

      this.http.post('https://opsbackend.herokuapp.com/api/message/savemessage', JSON.stringify(array), { headers: headers })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });


  }

  updateMessage(details: any) {
    let array = {
      _id: details._id,
      longitude: details.lng,
      latitude: details.lat,
      photo: null,
      received: details.received,
      sender: details.sender,
      recipient: details.recipient,
      read: details.read,
      text: details.text,
      creationDateUtc: null,
      lastUpdateDateUtc: null
    }
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://opsbackend.herokuapp.com/api/message/updatemessage', JSON.stringify(array), { headers: headers }).map(
      res => <Message[]>(res.json())
    ).catch((error: any) => Observable.throw(error.json().error || 'Server error'))

  }

  getLocatedMessage(id: string, Latlng: any): Observable<Message[]> {

    let array = {
      _id: id,
      latitude: Latlng.lat,
      longitude: Latlng.lng,
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://opsbackend.herokuapp.com/api/message/getlocatedmessages', JSON.stringify(array), { headers: headers }).map(
      res => <Message[]>(res.json())
    ).catch((error: any) => Observable.throw(error.json().error || 'Server error'))

  }

  getReceivedMessage(details): Observable<Message[]> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://opsbackend.herokuapp.com/api/message/getmessages', JSON.stringify(details), { headers: headers }).map(
      res => <Message[]>(res.json())
    ).catch((error: any) => Observable.throw(error.json().error || 'Server error'))

  }


}




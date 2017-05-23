import { Message } from "./Message";

export class User {
    _id: string;
    name: string;
    email: string;
    surname: string;
    password: string;
    friends: User[];
    inbox: Message[];
    outbox: Message[];
    /*
    Sirian:
     enable - creationDateUtc - lastUpdateDateUtc  sono nel json di risposta
     li mettiamo? ho assunto che essendo un prototipo, ogni volta che facciamo 
     una chiamata al server per avere le info dell'utente, il server mi risponde
     con tutti i messaggi ricevuti ed inviati.
    */

    constructor(name: string, email: string, password: string,
        _id: string, friends: User[], inbox: Message[], outbox: Message[], surname: string) {

        this.name = name;
        this.email = email;
        this.password = password;
        this._id = _id;
        this.surname = surname;
        this.friends = friends;
        this.inbox = inbox;
        this.outbox = outbox;
    }
}
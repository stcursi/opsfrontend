export class Message {
    
    [name: string]: any;
    _id : string;
    sender : string;
    recipient : string;
    longitude: number;
    received: Boolean;
    read: Boolean;
    latitude: number;
    text: string;
    creationDateUtc : Date;
    content : string; // come fare per contenuti multimediali?
    

    constructor(_id : string, sender : string, recipient: string,
     creationDateUtc : Date, lastUpdateDateUtc: Date, received: Boolean, read: Boolean ,content : string, text: string,
     photo: string, longitude: number, latitude: number) {
        this._id = _id;
        this.sender = sender;
        this.recipient = recipient;
        this.longitude = longitude;
        this.latitude = latitude;
        this.received = received;
        this.read = read;
        this.creationDateUtc = creationDateUtc;
        this.content = content;
        this.text = text;
    }
}
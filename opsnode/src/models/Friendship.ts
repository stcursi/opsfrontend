export class Friendship {

    _id: string;
    request_to: string;
    friend_id: string;
    accepted: Boolean;

    constructor(_id: string, request_to: string, friend_id: string, accepted: Boolean) {
        this._id = _id;
        this.request_to = request_to;
        this.friend_id = friend_id;
        this.accepted = accepted;
    }
}
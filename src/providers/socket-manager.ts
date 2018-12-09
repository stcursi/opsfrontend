import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:4040';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);

        console.log("SOCKET: ", this.socket);

        this.socket.onMessage()
            .subscribe((message: string) => {
                console.log('statte buon' + message);
            });

        this.socket.onEvent('connect')
            .subscribe(() => {
                console.log('connected');
            });

        this.socket.onEvent('disconnect')
            .subscribe(() => {
                console.log('disconnected');
            });

        this.socket.on('connect_error', (err) => {
            console.log('CANCAROOOO', err);
        })

        this.socket.on('connect_timeout', (err) => {
            console.log("TIMEOUT DI TIPO LUDRO: ", err);
          });
    }

    public send(message: string): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<string> {
        return new Observable<string>(observer => {
            this.socket.on('message', (data: string) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs";
import {IMessage} from "./app.interfaces";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private socket = io('http://localhost:3000');
  current: User;

  constructor() {
    this.current = new User();
  }

  login(userName) {
    this.socket.emit('login', userName);
    this.current.name = userName;
  }

  send(msg: IMessage) {
    this.socket.emit('message', msg);
  }

  receiving() {
    let observable = new Observable<IMessage>(message => {
      this.socket.on('message', (msg) => {
        message.next(msg);
      });
      return () => {
        this.socket.disconnect()
      }
    });
    return observable;
  }

  checkNewLogind() {
    let observable = new Observable<User>(list => {
      this.socket.on('login', (l) => {
        list.next(l);
      });
      return () => {
        this.socket.disconnect()
      }
    });
    return observable;
  }

  getCurrent() {
    return this.current;
  }

  checkDisconnection() {
    let observable = new Observable<User>(list => {
      this.socket.on('disconnect', (l) => {
        list.next(l);
      });
      return () => {
        this.socket.disconnect()
      }
    });
    return observable;
  }

}

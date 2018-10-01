import {Component, OnInit} from '@angular/core';
import {ChatService} from './shared/chat.service';
import Swal from 'sweetalert2'
import {IMessage} from "./shared/app.interfaces";
import {ChatUser, User} from "./shared/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  protected messages: IMessage[] = [];
  protected userList: ChatUser[] = [];
  protected username: string;
  protected focusTo: ChatUser;

  constructor(
    private chatService: ChatService
  ) {
    this.listenToMessages();
    this.listenToNewUsers();
    this.listenToDisconnections();
  }

  ngOnInit() {
    this.getUserName();
  }

  send(msg) {
    let obj: IMessage;
    if (this.focusTo) {
      obj = {text: msg, to: this.focusTo.getUser(), from: this.chatService.getCurrent()};
      this.focusTo.addMessage(obj);
    } else {
      obj = {text: msg}
    }
    this.chatService.send(obj);
  }

  changeFocus(user: ChatUser) {
    this.focusTo = user;
    if (!this.focusTo) {
      this.readAllPublicMessages();
    }
  }

  readAllPublicMessages() {
    let c = 0;
    this.messages.forEach((m) => {
      m.isUnread = false;
    });
    return c;
  }

  getPublicUnreadCount() {
    let c = 0;
    this.messages.forEach((m) => {
      if (m.isUnread) {
        c++
      }
    });
    return c;
  }

  private listenToMessages() {
    this.chatService.receiving().subscribe((msg) => {
      if (msg.hasOwnProperty('to')) {
        let from = this.userList.find((user) => user.id == msg.from.id);
        if (!this.focusTo || (this.focusTo && from.id !== this.focusTo.id)) {
          msg.isUnread = true;
        }
        from.addMessage(msg);
      } else {
        if (this.focusTo) {
          msg.isUnread = true;
        }
        this.messages.push(msg);

      }
    });
  }

  private listenToNewUsers() {
    this.chatService.checkNewLogind().subscribe((user: User) => {
      this.userList.push(new ChatUser(user));
    });
  }

  private listenToDisconnections() {
    this.chatService.checkDisconnection().subscribe((user: User) => {
      this.userList = this.userList.filter((l) => {
        return l.id !== user.id
      });
    });

  }

  async userNameInput() {
    await Swal({
      title: 'Please provide an username!',
      html: `<div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Username" id="username">
              </div>`,
      focusConfirm: false,
      allowOutsideClick: false,
      preConfirm: () => {
        this.username = document.getElementById('username')['value'];
      }
    });
  }

  getUserName() {
    if (!this.username) {
      this.userNameInput().then(() => {
        if (this.username) {
          this.chatService.login(this.username);
        } else {
          this.getUserName();
        }
      });
    }
  }

}

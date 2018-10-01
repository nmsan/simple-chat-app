import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatUser} from "../shared/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: ChatUser[];
  @Input() pubUnreadCount: number;
  @Output() changeChat = new EventEmitter<ChatUser>();
  current: ChatUser;
  constructor() { }

  ngOnInit() {
  }

  chat(user) {
    this.current = user;
    this.changeChat.emit(this.current);
    if(this.current) {
      this.current.readAll();
    }
  }

}

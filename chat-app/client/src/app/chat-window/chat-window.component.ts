import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IMessage} from "../shared/app.interfaces";
import {User} from "../shared/user";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnChanges {

  @Input() messages: IMessage[];
  @Input() user?: User;
  @Output() chatting = new EventEmitter<{}>();

  protected isPublic: boolean = true;
  protected msg: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.user) {
      this.isPublic = false;
    }
  }

  send() {
    this.chatting.emit(this.msg);
    this.msg = '';
  }
}

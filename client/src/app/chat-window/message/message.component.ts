import {Component, OnInit, Input} from '@angular/core';
import {IMessage} from '../../shared/app.interfaces';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  @Input() message: IMessage;

  constructor() {
  }

  ngOnInit() {
  }

}

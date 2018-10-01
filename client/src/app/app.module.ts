import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MessageComponent} from './chat-window/message/message.component';
import {FormsModule} from "@angular/forms";
import {ChatWindowComponent} from './chat-window/chat-window.component';
import {UserListComponent} from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ChatWindowComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

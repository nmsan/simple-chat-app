import {IMessage,} from "./app.interfaces";

export class User {
  public id: string;
  public name: string;

  public getUser() {
    return {id: this.id, name: this.name};
  }
}

export class ChatUser extends User {
  private messages: IMessage[] = [];

  constructor(user: User) {
    super();
    this.id = user.id;
    this.name = user.name;
  }

  addMessage(message: IMessage) {
    this.messages.push(message)
  }

  getAllMessage() {
    return this.messages;
  }

  getUnreadCount() {
    let c = 0;
    this.messages.forEach((m) => {
      if (m.isUnread) {
        c++
      }
    });
    return c;
  }

  readAll() {
    this.messages.forEach((m) => {
      m.isUnread = false;
    });
  }
}

export interface IMessage {
  text: string;
  to?: IUser;
  from?: IUser;
  isUnread?: boolean;
}

export interface IUser {
  id: string;
  name: string;
}


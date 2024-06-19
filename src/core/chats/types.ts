import { User } from "core/users/types";

export interface Chat {
  id: number;
  title: string;
  unread_messages_count: number;
  createdAt: string;
  updatedAt: string;
  users: User[];
  last_message: {
    id: string;
    message: string;
    attachment: string | null;
    was_edited: boolean;
    createdAt: string;
    updatedAt: string;
    user: User;
  };
  created_by: User;
}

export interface Message {
  id: string;
  message: string;
  was_edited: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
  attachment: string;
}

export interface MessagesData {
  count: number;
  data: Message[];
}

export interface ChatInfo {
  id: number;
  title: string;
  unread_messages_count: number;
  createdAt: string;
  updatedAt: string;
  users: User[];
  created_by: User;
}

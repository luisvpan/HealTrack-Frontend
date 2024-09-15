import { User } from 'core/users/types'; // Ajusta la ruta según sea necesario

export interface MessageNotification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  user: User;
}

import { Employee } from 'core/employees/types'; // Ajusta la ruta según sea necesario

export interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  deletedAt: Date;
  employee: Employee;
}

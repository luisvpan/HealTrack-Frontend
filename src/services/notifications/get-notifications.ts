import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Notification } from 'core/notifications/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

// URL base para las notificaciones
const URL = `${API_BASE_URL}/notifications/employee`;

export default async function getNotificationsByUserId(userId: number): Promise<Notification[]> {
  try {
    const response = await axios.get<Notification[]>(
      `${URL}/${userId}`, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
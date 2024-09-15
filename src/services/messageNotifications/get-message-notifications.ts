import axios from 'axios';
import { API_BASE_URL } from 'config/constants';
import { MessageNotification } from 'core/messageNotifications/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

// URL base para las notificaciones de mensajes
const URL = `${API_BASE_URL}/message-notifications/user`;

export default async function getMessageNotificationsByUserId(userId: number): Promise<MessageNotification[]> {
  try {
    const response = await axios.get<MessageNotification[]>(
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

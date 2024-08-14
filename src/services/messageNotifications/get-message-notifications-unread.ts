import axios from 'axios';
import { API_BASE_URL } from 'config/constants';
import BackendError from 'exceptions/backend-error';
import store from 'store';

// URL base para las notificaciones de mensajes
const URL = `${API_BASE_URL}/message-notifications/count/unread`;

export async function getUnreadMessageNotificationsCount(userId: number): Promise<number> {
  try {
    const response = await axios.get<number>(URL, {
      params: { userId },
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

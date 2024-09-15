import axios from 'axios';
import { API_BASE_URL } from 'config/constants';
import BackendError from 'exceptions/backend-error';
import store from 'store';

// URL base para las notificaciones de mensajes
const URL = `${API_BASE_URL}/message-notifications`;

export async function deleteMessageNotification(id: number): Promise<void> {
  try {
    await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

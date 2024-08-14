import axios from 'axios';
import { API_BASE_URL } from 'config/constants';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/message-notifications/user`;

export async function deleteAllMessageNotificationsByUserId(userId: number): Promise<void> {
  try {
    await axios.delete(`${URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import BackendError from 'exceptions/backend-error';
import store from 'store';

// URL base para las notificaciones
const URL = `${API_BASE_URL}/notifications/count/unread`;

export async function getUnreadNotificationsCount(employeeId: number): Promise<number> {
  try {
    const response = await axios.get<number>(URL, {
      params: { employeeId },
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

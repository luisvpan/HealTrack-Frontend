import axios from 'axios';
import { API_BASE_URL } from 'config/constants';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/notifications/employee`;

export async function deleteAllNotificationsByEmployeeId(employeeId: number): Promise<void> {
  try {
    await axios.delete(`${URL}/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

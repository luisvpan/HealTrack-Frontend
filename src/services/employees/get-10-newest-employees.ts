import axios from 'axios';
import { API_BASE_URL } from 'config/constants';
import { Employee } from 'core/employees/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/employees/ten-newest-employees`;

export default async function getNewestEmployees(): Promise<Employee[]> {
  try {
    const response = await axios.get<Employee[]>(URL, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      }
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

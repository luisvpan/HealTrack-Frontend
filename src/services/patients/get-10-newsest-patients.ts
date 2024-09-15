import axios from 'axios';
import { API_BASE_URL } from 'config/constants';
import { Patient } from 'core/patients/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/patients/ten-newest-patients`;

export default async function getNewestPatients(): Promise<Patient[]> {
  try {
    const response = await axios.get<Patient[]>(URL, {
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

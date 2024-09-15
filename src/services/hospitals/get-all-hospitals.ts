import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Hospital } from 'core/hospitals/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/hospitals`;

export default async function getAllHospitals(): Promise<Hospital[]> {
  try {
    const response = await axios.get<Hospital[]>(
      URL, {
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

import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Surgery } from 'core/surgeries/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/surgeries`;

export default async function getSurgery(idSurgery: string): Promise<Surgery> {
  try {
    const response = await axios.get<Surgery>(`${URL}/${idSurgery}`, {
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

import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Recommendation } from 'core/recommendations/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/recommendations`;

export default async function getRecommendation(
  idRecommendation: string
): Promise<Recommendation> {
  try {
    const response = await axios.get<Recommendation>(`${URL}/${idRecommendation}`, {
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

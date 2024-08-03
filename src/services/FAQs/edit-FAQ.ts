import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { FAQs } from 'core/FAQs/types'; 
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/faqs`;

export default async function editFAQ(
  idFAQ: number,
  body: FAQPayload
): Promise<FAQs> {
  try {
    const response = await axios.patch<FAQs>(`${URL}/${idFAQ}`, body, {
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

export type FAQPayload = Omit<FAQs, 'id'>;

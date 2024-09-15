import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const IMPORT_URL = `${API_BASE_URL}/database-actions/import`;

export async function importDatabase(formData: FormData): Promise<string> {
  try {
    const response = await axios.post<string>(IMPORT_URL, formData, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}


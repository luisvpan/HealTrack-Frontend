import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { AppFormulary } from "core/appForm/types";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/app-formulary`;

export default async function createAppForm(
  body: any
): Promise<AppFormulary> {
  try {
    const response = await axios.post<AppFormulary>(URL, body, {
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

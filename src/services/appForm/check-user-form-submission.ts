import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/app-formulary`;

// Función para verificar si un usuario ha enviado un formulario
export default async function checkUserFormSubmission(userId: number): Promise<boolean> {
  try {
    const response = await axios.get<{ hasSubmitted: boolean }>(`${URL}/user/submitted/${userId}`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data.hasSubmitted;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

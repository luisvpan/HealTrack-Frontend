import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

// Base URL para las preguntas
const URL = `${API_BASE_URL}/app-formulary/questions`;

export default async function getAcceptancePercentages() {
  try {
    const response = await axios.get(`${URL}/acceptance`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data; // Devuelve los porcentajes de aceptación
  } catch (error) {
    console.log(error);
    throw new BackendError(error);
  }
}
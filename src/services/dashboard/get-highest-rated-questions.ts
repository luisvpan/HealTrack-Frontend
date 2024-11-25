import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

// Base URL para las preguntas
const URL = `${API_BASE_URL}/app-formulary/questions`;

export default async function getHighestRatedQuestions() {
  try {
    const response = await axios.get(`${URL}/highest-rated`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data; // Devuelve las preguntas mejor calificadas
  } catch (error) {
    console.log(error);
    throw new BackendError(error);
  }
}
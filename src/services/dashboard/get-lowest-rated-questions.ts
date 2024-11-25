import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

// Base URL para las preguntas
const URL = `${API_BASE_URL}/app-formulary/questions`;

export default async function getLowestRatedQuestions() {
  try {
    const response = await axios.get(`${URL}/lowest-rated`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data; // Devuelve las preguntas peor calificadas
  } catch (error) {
    console.log(error);
    throw new BackendError(error);
  }
}
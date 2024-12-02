import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/reports`;

export default async function getSymptomsByAgeGroup() {
  try {
    const response = await axios.get(`${URL}/symptoms-by-age-group`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new BackendError(error);
  }
}
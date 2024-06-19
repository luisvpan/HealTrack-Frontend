import axios from "axios";
import BackendError from "../../exceptions/backend-error";
import store from "../../store";
import { API_BASE_URL } from "../../config/constants";
import { User } from "core/users/types";

// Own

const URL = `${API_BASE_URL}/users`;

export default async function getAllUsers(): Promise<User[]> {
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

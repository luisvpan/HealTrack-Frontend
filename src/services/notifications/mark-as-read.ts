import axios from "axios";
import BackendError from "../../exceptions/backend-error";
import { API_BASE_URL } from "../../config/constants";
import { Notification } from 'core/notifications/types';

// Define la URL del endpoint
const URL = `${API_BASE_URL}/notifications/mark-as-read`;

export default async function markNotificationAsRead(id: number): Promise<Notification> {
  try {
    const response = await axios.patch<Notification>(`${URL}/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

import axios from "axios";
import BackendError from "../../exceptions/backend-error";
import { API_BASE_URL } from "../../config/constants";
import { MessageNotification } from 'core/messageNotifications/types';

// Define la URL del endpoint
const URL = `${API_BASE_URL}/message-notifications/mark-as-read`;

export default async function markMessageMessageNotificationAsRead(id: number): Promise<MessageNotification> {
  try {
    const response = await axios.patch<MessageNotification>(`${URL}/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

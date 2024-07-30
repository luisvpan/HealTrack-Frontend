import axios from "axios";
import BackendError from "../../exceptions/backend-error";
import { API_BASE_URL } from "../../config/constants";

// Define la URL del endpoint
const URL = `${API_BASE_URL}/auth/change-password`;

export default async function changePassword(body: ChangePasswordBody): Promise<ChangePasswordResponse> {
  try {
    const response = await axios.patch<ChangePasswordResponse>(URL, body);
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

export interface ChangePasswordBody {
  userEmail: string;
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}
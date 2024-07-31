import axios from "axios";
import BackendError from "../../exceptions/backend-error";
import { API_BASE_URL } from "../../config/constants";

// Define la URL del endpoint
const URL = `${API_BASE_URL}/auth/reset-password`;

export default async function resetPassword(body: ResetPasswordBody): Promise<ResetPasswordResponse> {
  try {
    const response = await axios.post<ResetPasswordResponse>(`${URL}/${body.token}`, { newPassword: body.newPassword });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

export interface ResetPasswordBody {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

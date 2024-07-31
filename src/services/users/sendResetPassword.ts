// services/sendResetPasswordEmail.ts
import axios from "axios";
import BackendError from "../../exceptions/backend-error";
import { API_BASE_URL } from "../../config/constants";

// Define la URL del endpoint
const URL = `${API_BASE_URL}/auth/forgot-password`;

export default async function sendResetPasswordEmail(email: string): Promise<SendResetPasswordEmailResponse> {
  try {
    const response = await axios.post<SendResetPasswordEmailResponse>(URL, { email });
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

export interface SendResetPasswordEmailResponse {
  message: string;
}

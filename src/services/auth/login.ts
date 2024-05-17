import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { AllRole } from "core/users/types";
import BackendError from "exceptions/backend-error";

const URL = `${API_BASE_URL}/auth/login`;

export default async function login(body: LoginBody): Promise<LoginResponse> {
  try {
    console.log(body);
    console.log("akak " + URL);
    const response = await axios.post<LoginResponse>(URL, body);
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  token: string;
  role: AllRole;
}

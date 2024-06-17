import { AllRole } from "core/users/types";

export interface AuthState {
  user: null | {
    id: number;
    email: string;
    name: string;
    role: AllRole;
  };
  token: null | string;
  isAuth: boolean;
}

export interface AuthStored {
  user: {
    id: number;
    email: string;
    name: string;
    role: AllRole;
  };
  token: string;
}

export const STORAGE_KEY = "leafeon-auth-storage";

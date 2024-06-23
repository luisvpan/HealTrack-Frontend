import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { Patient } from "core/patients/types";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/auth/register/patient`;

export default async function createPatient(
  body: PatientPayload
): Promise<Patient> {
  try {
    const response = await axios.post<Patient>(URL, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

export type PatientPayload = Omit<Patient, "id" | "deletedAt">;

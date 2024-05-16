import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { Employee } from "core/employees/types";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/employees`;

export default async function createEmployee(
  body: EmployeePayload
): Promise<Employee> {
  try {
    const response = await axios.post<Employee>(URL, body, {
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

export type EmployeePayload = Omit<Employee, "id" | "deletedAt">;

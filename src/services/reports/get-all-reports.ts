import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { Report } from "core/reports/types";
import BackendError from "exceptions/backend-error";
import { PaginatedResponse } from "services/types";
import store from "store";

const URL = `${API_BASE_URL}/reports`;

export default async function getAllReports(): Promise<Report[]> {
  try {
    const response = await axios.get(URL, {
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

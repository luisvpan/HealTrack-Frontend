import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { PaginatedReportResult } from "core/reports/types";
import BackendError from "exceptions/backend-error";
import addQueryParams from "helpers/add-query-params";
import store from "store";

const URL = `${API_BASE_URL}/reports`;

export default async function getReportsByEmployee(
  employeeId: number,
  userId: number,
  startDate: string,
  endDate: string,
  limit: number,
  page: number
): Promise<PaginatedReportResult> {
  try {
    const urlPaginated = addQueryParams(`${URL}/employee/${employeeId}`, {
      userId,
      startDate,
      endDate,
      limit,
      page,
    });
    const response = await axios.get<PaginatedReportResult>(urlPaginated, {
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

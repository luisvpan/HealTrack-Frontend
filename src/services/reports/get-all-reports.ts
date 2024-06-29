import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { PaginatedReportResult } from "core/reports/types";
import BackendError from "exceptions/backend-error";
import addQueryParams from "helpers/add-query-params";
import store from "store";

const URL = `${API_BASE_URL}/reports`;

export default async function getAllReports(
  userId: number,
  startDate: string,
  endDate: string,
  limit: number,
  page: number
): Promise<PaginatedReportResult> {
  const urlPaginated = addQueryParams(URL, {
    userId,
    startDate,
    endDate,
    limit,
    page,
  });
  try {
    const response = await axios.get(urlPaginated, {
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

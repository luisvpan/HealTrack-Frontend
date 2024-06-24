import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { Report } from "core/reports/types";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/reports`;

export default async function getReportsByUser(
  userId: number,
  startDate?: string,
  endDate?: string
): Promise<Report[]> {
  try {
    const response = await axios.get<Report[]>(
      `${URL}/user/${userId}?${!!startDate ? "startDate=" + startDate : ""}${
        !!endDate ? "&endDate=" + endDate : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}

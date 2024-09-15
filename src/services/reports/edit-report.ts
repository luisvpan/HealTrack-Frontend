import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { Report } from "core/reports/types";
import BackendError from "exceptions/backend-error";
import store from "store";

const URL = `${API_BASE_URL}/reports`;

export default async function editReport(
  idReport: number,
  body: FormData
): Promise<Report> {
  try {
    const response = await axios.patch<Report>(`${URL}/${idReport}`, body, {
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

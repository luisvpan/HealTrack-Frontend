import axios from "axios";
// Own
import { API_BASE_URL } from "config/constants";
import { PaginatedAppFormularyResult } from "core/appForm/types";
import BackendError from "exceptions/backend-error";
import addQueryParams from "helpers/add-query-params"; // Asegúrate de que esta función esté implementada
import store from "store";

const URL = `${API_BASE_URL}/app-formulary`;

export default async function getAllAppForms(
  limit: number,
  page: number
): Promise<PaginatedAppFormularyResult> {
  const urlPaginated = addQueryParams(URL, {
    limit,
    page,
  });

  try {
    const response = await axios.get<PaginatedAppFormularyResult>(urlPaginated, {
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

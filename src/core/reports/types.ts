import { User } from "core/users/types";

export interface Report {
  id: number;
  isRespondingForEmployee: boolean;
  hasHighTemperature: boolean;
  hasRedness: boolean;
  hasSwelling: boolean;
  hasSecretions: boolean;
  additionalInformation: string | null;
  fileUrl: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
}
export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedReportResult {
  data: Report[];
  paginationData: PaginationData;
}

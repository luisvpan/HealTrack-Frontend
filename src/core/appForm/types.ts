import { User } from "core/users/types";

export interface AppFormulary {
  id: number;
  isRespondingForEmployee: boolean;
  likeApp: string;
  innescesaryDificultToUse: string;
  easyToUse: string;
  needExpertSupport: string;
  wellIntegratedFunctions: string;
  manyContradictions: string;
  peopleLearnQuickly: string;
  tediousToUse: string;
  feltConfidentUsing: string;
  neededKnowledgeBeforeUse: string;
  additionalInformation: string | null;
  createdAt: string;
  deletedAt: string | null;
  user: User;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedAppFormularyResult {
  data: AppFormulary[];
  paginationData: PaginationData;
}

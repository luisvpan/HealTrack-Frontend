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
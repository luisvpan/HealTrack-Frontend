import { User } from "core/users/types";

export interface Hospital {
  name: string;
}
export interface Employee {
  id: number;
  user: User;
  hospital: Hospital;
  deletedAt: Date;
}

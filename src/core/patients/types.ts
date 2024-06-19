import { Employee, Hospital } from "core/employees/types";
import { User } from "core/users/types";
import { Report } from "core/reports/types";

export enum SurgeryType {
  SURGERYTYPE1 = "A",
  SURGERYTYPE2 = "B",
  SURGERYTYPE3 = "C",
}

export enum StatusPatient {
  ACTIVE = "active",
  INACTIVE = "inactive",
  EMERGENCY = "emergency",
}

export enum TranslatedPatientStatus {
  active = "En seguimiento",
  inactive = "Dado de Alta",
  emergency = "Hospitalizado",
  closed = "Caso Cerrado",
}

export interface Patient {
  id: number;
  user: User;
  age: number;
  address: string;
  personalPhone: string;
  homePhone: string;
  hospital: Hospital;
  surgeryDate: string;
  surgeryProcedure: string;
  surgeryType: SurgeryType;
  automaticTracking: boolean;
  status: StatusPatient;
  deletedAt: Date;
  medic: Employee;
  patientReports?: Report[];
}

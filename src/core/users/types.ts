export enum AllRole {
  ADMIN = "admin",
  SPECIALIST = "specialist",
  ASSISTANT = "assistant",
  PATIENT = "patient"
}

export enum TranslatedRole {
  admin = "Administrador",
  specialist = "Especialista",
  assistant = "Enfermera/o",
  patient = "Paciente",
}

export interface User {
  id: number;
  name: string;
  lastname: string;
  password: string;
  email: string;
  identification: string;
  role: AllRole;
  isVerify: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
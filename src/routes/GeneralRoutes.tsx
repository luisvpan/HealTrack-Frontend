// project imports
import { RouteObject } from "react-router";

// Empleados
import Employees from "views/employees";
import CreateEmployee from "views/employees/create";
import EditEmployee from "views/employees/edit";
// Pacientes
import Patients from "views/patients";
import CreatePatient from "views/patients/create";
import EditPatient from "views/patients/edit";
import DetailPatient from "views/patients/detail";

import Chat from "views/chat";

import Reports from "views/reports";
import CreateReport from "views/reports/create";
import EditReport from "views/reports/edit";

const GeneralRoutes: RouteObject[] = [
  // Empleados
  {
    path: "employees",
    element: <Employees />,
  },
  {
    path: "employees/create",
    element: <CreateEmployee />,
  },
  {
    path: "employees/edit/:id",
    element: <EditEmployee />,
  },
  // Pacientes
  {
    path: "patients",
    element: <Patients />,
  },
  {
    path: "patients/create",
    element: <CreatePatient />,
  },
  {
    path: "patients/edit/:id",
    element: <EditPatient />,
  },
  {
    path: "patients/detail/:id",
    element: <DetailPatient />,
  },
  //Chat
  {
    path: "chat",
    element: <Chat />,
  },
  //Reports
  {
    path: "reports",
    element: <Reports />,
  },
  {
    path: "reports/create",
    element: <CreateReport />,
  },
  {
    path: "reports/edit/:id",
    element: <EditReport />,
  },
];

export default GeneralRoutes;

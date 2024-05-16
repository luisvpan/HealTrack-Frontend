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

import Chat from "views/chat";

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
  //Chat
  {
    path: "chat",
    element: <Chat />,
  },
];

export default GeneralRoutes;

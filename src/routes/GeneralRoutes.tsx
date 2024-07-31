// project imports
import store from "store";
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

// Hospitales
import Hospitals from "views/hospitals";
import CreateHospital from "views/hospitals/create";
import EditHospital from "views/hospitals/edit";

// Chat
import Chat from "views/chat";
import ChatList from "views/chat/chat-list";
import CreateChat from "views/chat/create";

// Reports
import Reports from "views/reports";
import CreateReport from "views/reports/create";
import EditReport from "views/reports/edit";

// Roles
import { AllRole } from "core/users/types";

const userRole = store.getState().auth.user?.role;
const isAssistant = userRole === AllRole.ASSISTANT;
const isAdmin = userRole === AllRole.ADMIN;

const GeneralRoutes: RouteObject[] = [
  // Empleados
  ...(isAdmin
    ? [
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
      ]
    : []),

  // Pacientes
  ...(isAssistant
    ? [
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
      ]
    : [
        {
          path: "patients",
          element: <Patients />,
        },
        {
          path: "patients/detail/:id",
          element: <DetailPatient />,
        },
      ]),

  // Hospitales
  ...(isAdmin
    ? [
        {
          path: "hospitals",
          element: <Hospitals />,
        },
        {
          path: "hospitals/create",
          element: <CreateHospital />,
        },
        {
          path: "hospitals/edit/:id",
          element: <EditHospital />,
        },
      ]
    : []),

  // Chat
  {
    path: "chat-list",
    element: <ChatList />,
  },
  {
    path: "chat/:chatId",
    element: <Chat />,
  },
  {
    path: "chat/create",
    element: <CreateChat />,
  },

  // Reports
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

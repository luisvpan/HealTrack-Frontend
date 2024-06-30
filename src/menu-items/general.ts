// assets
import store from "store";
import { IconUser } from "@tabler/icons";
import { AllRole } from "core/users/types";
import { MenuItem, MenuItemType } from "./types";
// constant
const userRole = store.getState().auth.user?.role;

const isAssistant = userRole === AllRole.ASSISTANT;
const isAdmin = userRole === AllRole.ADMIN;

const other: MenuItem = {
  id: "agencies-crud-category-general",
  type: MenuItemType.Group,
  title: "General",
  children: [
    ...(isAdmin
      ? [
          {
            id: "employees",
            title: "Empleados",
            type: MenuItemType.Collapse,
            icon: IconUser,
            breadcrumbs: false,
            children: [
              {
                id: "list-employees",
                title: "Lista de empleados",
                type: MenuItemType.Item,
                url: "/employees",
                breadcrumbs: false,
              },
              {
                id: "create-employees",
                title: "Crear empleado",
                type: MenuItemType.Item,
                url: "/employees/create",
                breadcrumbs: false,
              },
            ],
          },
        ]
      : []),

    ...(isAssistant
      ? [
          {
            id: "patients",
            title: "Pacientes",
            type: MenuItemType.Collapse,
            icon: IconUser,
            breadcrumbs: false,
            children: [
              {
                id: "list-patients",
                title: "Lista de pacientes",
                type: MenuItemType.Item,
                url: "/patients",
                breadcrumbs: false,
              },
              {
                id: "create-patients",
                title: "Crear paciente",
                type: MenuItemType.Item,
                url: "/patients/create",
                breadcrumbs: false,
              },
            ],
          },
        ]
      : [
          {
            id: "patients",
            title: "Pacientes",
            type: MenuItemType.Collapse,
            icon: IconUser,
            breadcrumbs: false,
            children: [
              {
                id: "list-patients",
                title: "Lista de pacientes",
                type: MenuItemType.Item,
                url: "/patients",
                breadcrumbs: false,
              },
            ],
          },
        ]),
    {
      id: "chat",
      title: "Chat",
      type: MenuItemType.Collapse,
      icon: IconUser,
      breadcrumbs: false,
      children: [
        {
          id: "chat",
          title: "Lista de chats",
          type: MenuItemType.Item,
          url: "/chat-list",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "reports",
      title: "Reportes",
      type: MenuItemType.Collapse,
      icon: IconUser,
      breadcrumbs: false,
      children: [
        {
          id: "list-reports",
          title: "Lista de reportes",
          type: MenuItemType.Item,
          url: "/reports",
          breadcrumbs: false,
        },
        {
          id: "create-reports",
          title: "Crear reporte",
          type: MenuItemType.Item,
          url: "/reports/create",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default other;

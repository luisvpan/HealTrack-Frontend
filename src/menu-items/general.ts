// assets
import { IconUser } from "@tabler/icons";
import { MenuItem, MenuItemType } from "./types";
import store from "store";
// constant
const userRole = store.getState().auth.user?.role;
const isSpecialist = userRole === "specialist" || userRole === "assistant";
const isPatient = userRole === "patient";
const isAdmin = userRole === "admin";
const other: MenuItem = {
  id: "agencies-crud-category-general",
  type: MenuItemType.Group,
  title: "General",
  children: [
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
          title: "Crear empleado",
          type: MenuItemType.Item,
          url: "/patients/create",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "chat",
      title: "Chat",
      type: MenuItemType.Collapse,
      icon: IconUser,
      breadcrumbs: false,
      children: [
        {
          id: "chat",
          title: "Chat",
          type: MenuItemType.Item,
          url: "/chat",
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

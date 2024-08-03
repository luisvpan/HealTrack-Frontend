// assets
import store from "store";
import { IconUser, IconBuildingHospital, IconClipboardList, IconQuestionMark, IconRobot } from "@tabler/icons";
import { AllRole } from "core/users/types";
import { MenuItem, MenuItemType } from "./types";

const userRole = store.getState().auth.user?.role;

const isAssistant = userRole === AllRole.ASSISTANT;
const isAdmin = userRole === AllRole.ADMIN;
const isPatient = userRole === AllRole.PATIENT;

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
          {
            id: "hospitals",
            title: "Hospitales",
            type: MenuItemType.Collapse,
            icon: IconBuildingHospital,
            breadcrumbs: false,
            children: [
              {
                id: "list-hospitals",
                title: "Lista de hospitales",
                type: MenuItemType.Item,
                url: "/hospitals",
                breadcrumbs: false,
              },
              {
                id: "create-hospitals",
                title: "Crear hospital",
                type: MenuItemType.Item,
                url: "/hospitals/create",
                breadcrumbs: false,
              },
            ],
          },
          {
            id: "recommendations",
            title: "Recomendaciones",
            type: MenuItemType.Collapse,
            icon: IconClipboardList,
            breadcrumbs: false,
            children: [
              {
                id: "list-recommendations",
                title: "Lista de recomendaciones",
                type: MenuItemType.Item,
                url: "/recommendations",
                breadcrumbs: false,
              },
              {
                id: "create-recommendations",
                title: "Crear recomendación",
                type: MenuItemType.Item,
                url: "/recommendations/create",
                breadcrumbs: false,
              },
            ],
          },
          {
            id: "faqs",
            title: "Preguntas Frecuentes",
            type: MenuItemType.Collapse,
            icon: IconQuestionMark,
            breadcrumbs: false,
            children: [
              {
                id: "list-faqs",
                title: "Lista de Preguntas Frecuentes",
                type: MenuItemType.Item,
                url: "/faqs",
                breadcrumbs: false,
              },
              {
                id: "create-faqs",
                title: "Crear Pregunta Frecuente",
                type: MenuItemType.Item,
                url: "/faqs/create",
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

    ...(isPatient
      ? [
          {
            id: "recommendations",
            title: "Recomendaciones",
            type: MenuItemType.Collapse,
            icon: IconClipboardList,
            breadcrumbs: false,
            children: [
              {
                id: "list-recommendations",
                title: "Lista de recomendaciones",
                type: MenuItemType.Item,
                url: "/recommendations",
                breadcrumbs: false,
              },
            ],
          },
          {
            id: "faqs",
            title: "ChatBot",
            type: MenuItemType.Collapse,
            icon: IconRobot,
            breadcrumbs: false,
            children: [
              {
                id: "list-faqs",
                title: "Busque su pregunta",
                type: MenuItemType.Item,
                url: "/faqs",
                breadcrumbs: false,
              },
            ],
          },
        ]
      : []),
  ],
};

export default other;

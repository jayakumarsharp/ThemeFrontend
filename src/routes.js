// @mui icons
import Icon from "@mui/material/Icon";

const routes = [

  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    isProtected: true,
  },



  {
    type: "collapse",
    name: "security",
    key: "security",
    icon: <Icon fontSize="small">Security</Icon>,
    route: "/security",
    isProtected: true,
  },
  {
    type: "collapse",
    name: "price",
    key: "price",
    icon: <Icon fontSize="small">Price</Icon>,
    route: "/price",
    isProtected: true,
  },

  {
    type: "collapse",
    name: "Heat Map",
    key: "heatmap",
    icon: <Icon fontSize="small">Heat Map</Icon>,
    route: "/heatmap",
    isProtected: true,
  },
  {
    type: "collapse",
    name: "Ledger NAV",
    key: "ledger",
    icon: <Icon fontSize="small">Ledger NAV</Icon>,
    route: "/ledgerNAV",
    isProtected: true,
  },
  {
    type: "collapse",
    name: "dataimport",
    key: "dataimport",
    icon: <Icon fontSize="small">Data import</Icon>,
    route: "/dataimport",
    isProtected: true,
  },
  {
    type: "collapse",
    name: "analytics",
    key: "analytics",
    icon: <Icon fontSize="small">Analytics </Icon>,
    route: "/analytics",
    isProtected: true,
  },
  {
    type: "collapse",
    name: "PF add",
    key: "PF add",
    icon: <Icon fontSize="small">PF add </Icon>,
    route: "/portfolio/add",
    isProtected: false,
  },
  {
    type: "collapse",
    name: "currency",
    key: "currency",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/currency",
    isProtected: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    isProtected: true,
  },
];

export default routes;

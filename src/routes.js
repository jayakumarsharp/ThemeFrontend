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
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    isProtected: true,
  },
];

export default routes;

// <Route exact path="/portfolio/add" element={<NewPortfolioForm />} />
//         <Route exact path="/portfolio/:id" element={<Portfolio />} />
//         <Route path="/results" element={<SearchResults />} />
//         <Route path="/detailed" element={<QuoteDetailed />} />
// {
//   type: "main",
//   name: "Sign In",
//   key: "sign-in",
//   icon: <Icon fontSize="small">login</Icon>,
//   route: "/authentication/login",
//   isProtected: false,
// },
// {
//   type: "collapse",
//   name: "Sign Up",
//   key: "sign-up",
//   icon: <Icon fontSize="small">assignment</Icon>,
//   route: "/signup",
//   isProtected: false,
// },

// {
//   type: "collapse",
//   name: "addsecurity",
//   key: "addsecurity",
//   icon: <Icon fontSize="small">Add Security</Icon>,
//   route: "/addsecurity",
//   isProtected: false,
// },
// {
//   type: "collapse",
//   name: "detailed",
//   key: "detailed",
//   icon: <Icon fontSize="small">detailed </Icon>,
//   route: "/detailed",
//   isProtected: false,
// },

// {
//   type: "collapse",
//   name: "results",
//   key: "results",
//   icon: <Icon fontSize="small">results </Icon>,
//   route: "/results",
//   isProtected: false,
// },


// {
//   type: "collapse",
//   name: "portfolio",
//   key: "portfolio",
//   icon: <Icon fontSize="small">portfolio Detail </Icon>,
//   route: "/portfolio/:id",
//   isProtected: false,
// },
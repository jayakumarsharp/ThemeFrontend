import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SecurityComponent from 'components/Security/Listsecuritycomponent';
import PriceHomePageApp from 'components/Price/Homepage';
import AddSecurityForm from 'components/Security/AddSecurity';
import FileImportComponent from 'components/dataimport/FileImportComponent';
import AnalyticsComponent from 'components/Stockdata/Analysis';
import PageWithTabs from 'components/Stockdata/PageWithTabs';
import NewPortfolioForm from "components/portfolio/NewPortfolioForm";
import SearchResults from "components/search/SearchResults";
import QuoteDetailed from "components/detailed/QuoteDetailed";
import Portfolio from "components/portfolio/Portfolio";
// @mui icons
import Icon from "@mui/material/Icon";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  }, 
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },

  {
    type: "collapse",
    name: "security",
    key: "security",
    icon: <Icon fontSize="small">Security</Icon>,
    route: "/security",
    component: <SecurityComponent />,
  },
  {
    type: "collapse",
    name: "price",
    key: "price",
    icon: <Icon fontSize="small">Price</Icon>,
    route: "/price",
    component: <PriceHomePageApp />,
  },
  {
    type: "collapse",
    name: "addsecurity",
    key: "addsecurity",
    icon: <Icon fontSize="small">Add Security</Icon>,
    route: "/authentication/sign-up",
    component: <AddSecurityForm />,
  },
  {
    type: "collapse",
    name: "dataimport",
    key: "dataimport",
    icon: <Icon fontSize="small">Data import</Icon>,
    route: "/dataimport",
    component: <FileImportComponent />,
  },

  {
    type: "collapse",
    name: "analytics",
    key: "analytics",
    icon: <Icon fontSize="small">Analytics </Icon>,
    route: "/analytics",
    component: <AnalyticsComponent />,
  },



  {
    type: "collapse",
    name: "PF add",
    key: "PF add",
    icon: <Icon fontSize="small">PF add </Icon>,
    route: "/portfolio/add",
    component: <NewPortfolioForm />,
  },

  {
    type: "collapse",
    name: "portfolio",
    key: "portfolio",
    icon: <Icon fontSize="small">portfolio Detail </Icon>,
    route: "/portfolio/:id",
    component: <Portfolio />,
  },


  {
    type: "collapse",
    name: "results",
    key: "results",
    icon: <Icon fontSize="small">results </Icon>,
    route: "/results",
    component: <SearchResults />,
  },
  {
    type: "collapse",
    name: "detailed",
    key: "detailed",
    icon: <Icon fontSize="small">detailed </Icon>,
    route: "/dataimport",
    component: <QuoteDetailed />,
  },
];

export default routes;


// <Route exact path="/portfolio/add" element={<NewPortfolioForm />} />
//         <Route exact path="/portfolio/:id" element={<Portfolio />} />
//         <Route path="/results" element={<SearchResults />} />
//         <Route path="/detailed" element={<QuoteDetailed />} />
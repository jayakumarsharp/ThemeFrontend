import { useState, useEffect, useMemo } from "react";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MaterialTheme/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
// Material Dashboard 2 React routes
import routes from "./routes";
import ProtectedRoute from "./protectedroutes";
// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { useAuth } from "hooks/useAuth";

import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SecurityComponent from "components/Security/Listsecuritycomponent";
import PriceHomePageApp from "components/Price/Homepage";
import AddSecurityForm from "components/Security/AddSecurity";
import FileImportComponent from "components/dataimport/FileImportComponent";
import HeatMapComponent from "components/heatmap/index";
import AnalyticsComponent from "components/Stockdata/Analysis";
import PageWithTabs from "components/Stockdata/PageWithTabs";
import NewPortfolioForm from "components/portfolio/NewPortfolioForm";
import SearchResults from "components/search/SearchResults";
import QuoteDetailed from "components/detailed/QuoteDetailed";
import Portfolio from "components/portfolio/Portfolio";
import LedgerNAV from "components/Ledgerdata/index";
import CurrencyGrid from "components/currency/currencygrid";


export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const { currentUser } = useAuth();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getCommonRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      // if (route.collapse) {
      //   return getRoutes(route.collapse);
      // }
      console.log(routes);
      if (!route.isProtected) {
        return <Route exact path={route.route} element={<Dashboard />} />;
      }

      //return null;
    });

  const getrestrictedRoutes = (allRoutes) =>
    allRoutes.map((route) => {
     
      if (route.isProtected) {
        return <Route exact path={route.route} element={route.component} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {currentUser != null && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="FinTech"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/portfolio/add" element={<NewPortfolioForm />} />
        <Route path="/portfolio/:id" element={<Portfolio />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/detailed" element={<QuoteDetailed />} />
        <Route path="/security" element={<SecurityComponent />} />
        <Route path="/price" element={<PriceHomePageApp />} />
        <Route path="/addsecurity" element={<AddSecurityForm />} />
        <Route path="/dataimport" element={<FileImportComponent />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/analytics" element={<AnalyticsComponent />} />
        <Route path="/page-with-tabs" element={<PageWithTabs />} />
        <Route path="/heatmap" element={<HeatMapComponent />} />
        <Route path="/ledgerNAV" element={<LedgerNAV />} />
        <Route path="/currency" element={<CurrencyGrid />} />

      </Routes>
    </ThemeProvider>
  );
}

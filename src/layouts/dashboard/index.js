import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MaterialTheme/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useAuth } from "hooks/useAuth";
import Quotes from "components/quote/Quotes";
import TrendingSymbols from "components/home/TrendingSymbols";
import PortfolioSummary from "components/home/PortfolioSummary";
function Dashboard() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <h2>Summary</h2>
            {currentUser && <PortfolioSummary />}
            <Grid>
              <Quotes
                label="US Markets"
                symbols={["^GSPC", "^DJI", "^IXIC", "^RUT"]}
                showSymbol={false}
                showName={true}
              />
              <Quotes
                label="Crytocurrencies"
                symbols={["BTC-USD", "ETH-USD"]}
                showSymbol={false}
                showName={true}
              />
              {currentUser && (
                <Quotes
                  label="Watchlist"
                  symbols={currentUser?.watchlist}
                  showSymbol={true}
                  showName={true}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Dashboard;

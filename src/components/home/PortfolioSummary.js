import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Quotes from "../quote/Quotes";
import MDBox from "components/MaterialTheme/MDBox";
import Grid from "@mui/material/Grid";
import MDButton from "components/MaterialTheme/MDButton";
import MDTypography from "components/MaterialTheme/MDTypography";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
} from "@mui/material";

const PortfolioSummary = () => {
  const { currentUser } = useAuth();
  console.log('current user at tempalte',currentUser)
  return (
    <>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card sx={{ height: "100%" }}>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={3}
                px={2}
              >
                <MDTypography variant="h4" fontWeight="medium" textTransform="capitalize">
                  Portfolios
                </MDTypography>
                <MDTypography variant="h6" color="success" fontWeight="bold" textTransform="capitalize">
                  
                   {currentUser?.portfolios?.length ?? "0"} portfolios found for{" "}
                  {currentUser?.portfolios.username} 
                </MDTypography>

                <Link className="symbolLink" to="/portfolio/add">
                  <MDButton variant="gradient" color="info" fullWidth>
                    Add New portfolio
                  </MDButton>
                </Link>
              </MDBox>

              {currentUser?.portfolios?.length
                ? currentUser?.portfolios.map((p) => {
                   // const symbols = p.holdings.map((h) => h.symbol);
                    return (
                      <Quotes
                        key={`p${p.id}`}
                        label={`${p.name}`}
                        headerLink={`/portfolio/${p.id}`}
                        //symbols={symbols}
                        showSymbol={true}
                        showName={true}
                      />
                    );
                  })
                : ""}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
};

export default PortfolioSummary;

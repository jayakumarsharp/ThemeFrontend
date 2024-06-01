import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Quotes from "../quote/Quotes";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const PortfolioSummary = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Table className="Quotes" responsive>
              <thead>
                <tr>
                  <th className="headerTitle">Portfolios</th>
                  <th className="headerMarketValue"></th>
                  <th className="headerMarketChange"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="shortName">
                    {currentUser?.portfolios?.length ?? "0"} portfolios found for{" "}
                    {currentUser?.username}
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="shortName">
                    <MDBox p={2}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} lg={3}>
                          <Link className="symbolLink" to="/portfolio/add">
                            <MDButton variant="gradient" color="info" fullWidth>
                              Add New portfolio
                            </MDButton>
                          </Link>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
            {currentUser?.portfolios?.length
              ? currentUser?.portfolios.map((p) => {
                  const symbols = p.holdings.map((h) => h.symbol);
                  return (
                    <Quotes
                      key={`p${p.id}`}
                      label={`${p.name}`}
                      headerLink={`/portfolio/${p.id}`}
                      symbols={symbols}
                      showSymbol={true}
                      showName={true}
                    />
                  );
                })
              : ""}
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
};

export default PortfolioSummary;

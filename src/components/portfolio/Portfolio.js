import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Table, Button } from "@mui/material";
import { useAuth } from "hooks/useAuth";
import PortfolioApi from "../../api/api";
import DeletePortfolioModal from "./DeletePortfolioModal";
import EditNameModal from "./EditNameModal";
//import Notes from "./Notes";
import Holdings from "../holding/Holdings";
import UpdateCashModal from "./UpdateCashModal";
import { toDecimalHundredths } from "../../helpers/formatter";
import "./Portfolio.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MaterialTheme/MDTypography";
import MDButton from "components/MaterialTheme/MDButton";

import MDBox from "components/MaterialTheme/MDBox";
const Portfolio = () => {
  const { currentUser, refresh } = useAuth();
  const { go } = useNavigate();
  const { id } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [totalValue, setTotalValue] = useState([]);
  const [displayObject, setDisplayObject] = useState([]);
  const [portfolio, setPortfolio] = useState(
    currentUser?.portfolios?.find((p) => p.id === Number(id))
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditCashModal, setShowEditCashModal] = useState(false);

  useEffect(() => {
    if (portfolio) {
      setHoldings(portfolio?.holdings);
    }
  }, [portfolio]);

  useEffect(() => {
    async function getQuote() {
      if (holdings && holdings.length > 0) {
        const symbols = holdings.map((h) => h.symbol);
        const data = await PortfolioApi.getQuote({ symbols });
        setQuotes(data);
      }
    }
    getQuote();
  }, [holdings]);

  useEffect(() => {
    if (quotes?.length && holdings?.length) {
      // console.log(quotes);
      // console.log(holdings);
      const combined = holdings.map((h) => {
        let data = quotes.find((q) => q.symbol === h.symbol);
        if (data) {
          const {
            symbol,
            shortName,
            regularMarketPrice,
            regularMarketChange,
            regularMarketChangePercent,
          } = data;
          let id = h.id;
          let shares_owned = Number(h.shares_owned);
          let price = regularMarketPrice;
          let change = regularMarketChange;
          let percent = regularMarketChangePercent;
          let value = Number(shares_owned) * Number(price) ?? 0;
          return { id, symbol, shortName, shares_owned, price, change, percent, value };
        }
        return null;
      });
      // console.log(combined);
      const totalValue = combined.reduce((prev, next) => prev + (next?.value ?? 0), 0);
      setDisplayObject(combined);
      setTotalValue(Number(totalValue));
    }
  }, [quotes, holdings, portfolio]);

  const handleDeleteWarning = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleEditNamePopup = () => setShowEditNameModal(true);
  const handleCloseEditNameModal = () => setShowEditNameModal(false);
  const handleEditCashPopup = () => setShowEditCashModal(true);
  const handleCloseEditCashModal = () => setShowEditCashModal(false);
  const handleEditPortfolio = async (data) => {
    try {
      let updated = await PortfolioApi.updatePortfolio(id, data);
      setPortfolio(updated.portfolio);
      await refresh(currentUser.username);
      // return { success: true }
      go(`/portfolio/${id}`);
    } catch (errors) {
      return { success: false, errors };
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={2} pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <MDTypography variant="h2" fontWeight="bold" textTransform="capitalize">
                {portfolio ? portfolio.name : "Invalid Portfolio..."}
              </MDTypography>
            </Grid>
            {portfolio && (
              <>
                <Card sx={{ height: "100%" }}>
                 {/*  <Grid container justifyContent="center">
                    <MDBox display="flex">
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="right"
                        pt={3}
                        px={2}
                      >
                        <MDButton
                          variant="gradient"
                          color="info"
                          onClick={handleEditNamePopup}
                          fullWidth
                        >
                          Edit portfolio name
                        </MDButton>
                      </MDBox> 
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="right"
                        pt={3}
                        px={2}
                      >
                        <MDButton
                          variant="gradient"
                          color="warning"
                          onClick={handleDeleteWarning}
                          fullWidth
                        >
                          Delete portfolio
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </Grid>*/}

                  <Holdings
                    holdings={displayObject}
                    setHoldings={setHoldings}
                    portfolio_id={portfolio?.id}
                  />
                </Card>
                <Card sx={{ height: "100%" }}>
                  <Grid container justifyContent="center">
                    <MDBox display="flex">
                      <MDTypography variant="h2" fontWeight="bold" textTransform="capitalize">
                        Total Available cash : {portfolio?.cash}
                      </MDTypography>

                      <Grid container justifyContent="center">
                        <MDBox display="flex">
                          <MDBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="right"
                            pt={3}
                            px={2}
                          >
                            <MDButton
                              variant="gradient"
                              color="info"
                              onClick={handleEditCashPopup}
                              fullWidth
                            >
                              Update Cash
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </Grid>
                    </MDBox>
                    <MDBox display="flex">
                      <MDTypography variant="h2" fontWeight="bold" textTransform="capitalize">
                        Total Value
                      </MDTypography>

                      <Grid container justifyContent="center">
                        <MDBox display="flex">
                          <MDBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="right"
                            pt={3}
                            px={2}
                          >
                            {" "}
                            <MDTypography variant="h2" fontWeight="bold" textTransform="capitalize">
                              {toDecimalHundredths(totalValue + Number(portfolio?.cash))}
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </Grid>
                    </MDBox>
                  </Grid>

                  <EditNameModal
                    showModal={showEditNameModal}
                    handleClose={handleCloseEditNameModal}
                    handleEdit={handleEditPortfolio}
                    portfolio={portfolio}
                  />
                  <UpdateCashModal
                    showModal={showEditCashModal}
                    handleClose={handleCloseEditCashModal}
                    handleEdit={handleEditPortfolio}
                    portfolio={portfolio}
                  />
                </Card>
              </>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Portfolio;

{
  /* <Notes handleEdit={handleEditPortfolio} portfolio={portfolio} /> */
}
{
  /* <DeletePortfolioModal
              id={id}
              showModal={showDeleteModal}
              handleClose={handleCloseDeleteModal}
            /> */
}

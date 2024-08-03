import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import PortfolioApi from "../../api/api";
import Holdings from "../holding/Holdings";
import DeletePortfolioModal from "./DeletePortfolioModal";
import EditNameModal from "./EditNameModal";
import UpdateCashModal from "./UpdateCashModal";
import { toDecimalHundredths } from "../../helpers/formatter";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MaterialTheme/MDTypography";
import MDButton from "components/MaterialTheme/MDButton";
import MDBox from "components/MaterialTheme/MDBox";
import "./Portfolio.css";

const Portfolio = () => {
  const { currentUser, refresh } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [displayObject, setDisplayObject] = useState([]);
  const [portfolio, setPortfolio] = useState(currentUser?.portfolios?.find((p) => p._id === id));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditCashModal, setShowEditCashModal] = useState(false);

  useEffect(() => {
    if (portfolio) {
      setHoldings(portfolio?.holdings);
    }
  }, [portfolio]);

  useEffect(() => {
    if (holdings?.length) {
      const combined = holdings;
      // .map((h) => {
      //   let shortName = h.shortName;
      //   let regularMarketPrice = h.regular_market_price;
      //   let symbol = h.symbol;
      //   let id = h.id;
      //   let shares_owned = Number(h.quantity);
      //   let price = h.executed_price;
      //   let change = h.today_value;
      //   let percent = h.gain_loss_percent;
      //   return { id, symbol, shortName, shares_owned,average_buy_price, price, change, percent, regularMarketPrice };
      // });
      const totalValue = holdings.reduce((prev, next) => prev + (next?.value ?? 0), 0);
      setDisplayObject(holdings);
      setTotalValue(Number(totalValue));
    }
  }, [holdings, portfolio]);

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
      navigate(`/portfolio/${id}`);
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
                  <Holdings holdings={displayObject} setHoldings={setHoldings} portfolio_id={portfolio?._id} />
                </Card>
                <Card sx={{ height: "100%" }}>
                  <Grid container justifyContent="center">
                    <MDBox display="flex">
                      <MDTypography variant="h2" fontWeight="bold" textTransform="capitalize">
                        Total Available cash : {portfolio?.cash}
                      </MDTypography>
                      <Grid container justifyContent="center">
                        <MDBox display="flex">
                          <MDBox display="flex" justifyContent="space-between" alignItems="right" pt={3} px={2}>
                            <MDButton variant="gradient" color="info" onClick={handleEditCashPopup} fullWidth>
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
                          <MDBox display="flex" justifyContent="space-between" alignItems="right" pt={3} px={2}>
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

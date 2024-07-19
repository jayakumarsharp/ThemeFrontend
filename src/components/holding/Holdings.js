import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import PortfolioApi from "../../api/api";
import { toDecimalHundredths } from "../../helpers/formatter";
import "./Holdings.css";
import EditHoldingModal from "./EditHoldingModal";
import AddHoldingModal from "./AddHoldingModal";
import { Button, Grid } from "@mui/material";
import Holdingdata from "./holdingdata";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MaterialTheme/MDBox";
import MDButton from "components/MaterialTheme/MDButton";

import useIsMountedRef from "../../hooks/useIsMountedRef";

const Holdings = ({ holdings, portfolio_id }) => {
  const { currentUser, refresh } = useAuth();
  const { go } = useNavigate();
  const [showEditHoldingModal, setShowEditHoldingModal] = useState(false);
  const [showAddHoldingModal, setShowAddHoldingModal] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    if (holdings.length > 0) {
      const result = Holdingdata({ holdings });
      console.log(result);
      setColumns(result.columns);
      setRows(result.rows);
    }
  }, [holdings, isMountedRef]);

  const handleEditHoldingPopup = (id) => {
    if (id) {
      setSelectedHolding(holdings.find((h) => h.id === id));
      setShowEditHoldingModal(true);
    }
  };

  const handleCloseEditHoldingModal = () => {
    setSelectedHolding(null);
    setShowEditHoldingModal(false);
  };

  const handleEditHolding = async (data) => {
    try {
      let updated = await PortfolioApi.updateHolding(selectedHolding.id, data);
      await refresh(currentUser.username);
      go(`/portfolio/${portfolio_id}`);
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const handleDeleteHolding = async (id) => {
    let res = await PortfolioApi.deleteHolding(id);
    if (res === Number(id)) {
      await refresh(currentUser.username);
      go(`/portfolio/${portfolio_id}`);
    }
  };

  const handleAddHoldingPopup = () => setShowAddHoldingModal(true);
  const handleCloseAddHoldingModal = () => setShowAddHoldingModal(false);
  const handleAddHolding = async (data) => {
    try {
      console.log(data);
      let holding = await PortfolioApi.addHolding(data);
      if (holding.success) {
        await refresh(currentUser.username);
        go(`/portfolio/${portfolio_id}`);
      } else {
        let { errors } = holding;
        return { success: false, errors };
      }
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const marketChangeColor = (number) => {
    if (number < 0) return "red";
    else if (number > 0) return "green";
    else return "black";
  };

  return (
    <>
      <Grid container justifyContent="center">
        <MDBox display="flex">
          <MDBox display="flex" justifyContent="space-between" alignItems="right" pt={3} px={2}>
            <MDButton variant="gradient" color="success" onClick={handleAddHoldingPopup} fullWidth>
              Add holding
            </MDButton>
          </MDBox>
        </MDBox>
      </Grid>

      <MDBox pt={3}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>

      {selectedHolding ? (
        <EditHoldingModal
          showModal={showEditHoldingModal}
          handleClose={handleCloseEditHoldingModal}
          handleEdit={handleEditHolding}
          handleDelete={handleDeleteHolding}
          holding={selectedHolding}
          portfolio_id={portfolio_id}
        />
      ) : (
        ""
      )}
      <AddHoldingModal
        showModal={showAddHoldingModal}
        handleClose={handleCloseAddHoldingModal}
        handleAdd={handleAddHolding}
        portfolio_id={portfolio_id}
      />
    </>
  );
};

export default Holdings;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PortfolioApi from "../../api/api";
//import DataTable from "examples/Tables/DataTable";
import EditHoldingModal from "./EditHoldingModal";
import AddHoldingDialog from "./AddHoldingModal";

//import Holdingdata from "./holdingdata";

import HoldingTable from "./holdingdata";
import MDBox from "components/MaterialTheme/MDBox";
import MDButton from "components/MaterialTheme/MDButton";
import Grid from "@mui/material/Grid";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import "./Holdings.css";

const Holdings = ({ holdings, portfolio_id }) => {
  const { currentUser, refresh } = useAuth();
  const navigate = useNavigate();
  const [showEditHoldingModal, setShowEditHoldingModal] = useState(false);
  const [showAddHoldingDialog, setShowAddHoldingDialog] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const isMountedRef = useIsMountedRef();

  // useEffect(() => {
  //   if (holdings.length > 0) {
  //     const result = Holdingdata({ holdings });
  //     setColumns(result.columns);
  //     setRows(result.rows);
  //   }
  // }, [holdings, isMountedRef]);

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
      navigate(`/portfolio/${portfolio_id}`);
    } catch (errors) {
      console.error(errors);
      return { success: false, errors };
    }
  };

  const handleDeleteHolding = async (id) => {
    try {
      let res = await PortfolioApi.deleteHolding(id);
      if (res === Number(id)) {
        await refresh(currentUser.username);
        navigate(`/portfolio/${portfolio_id}`);
      }
    } catch (errors) {
      console.error(errors);
    }
  };

  const handleAddHoldingPopup = () => setShowAddHoldingDialog(true);
  const handleCloseAddHoldingDialog = () => setShowAddHoldingDialog(false);
  const handleAddHolding = async (data) => {
    try {
      let holding = await PortfolioApi.addHolding(data);
      if (holding.success) {
        await refresh(currentUser.username);
        navigate(`/portfolio/${portfolio_id}`);
      } else {
        let { errors } = holding;
        console.error(errors);
        return { success: false, errors };
      }
    } catch (errors) {
      console.error(errors);
      return { success: false, errors };
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
        <MDBox display="flex" justifyContent="space-between" alignItems="right" pt={3} px={2}>
          <MDButton variant="gradient" color="success" onClick={handleAddHoldingPopup} fullWidth>
            Add holding
          </MDButton>
        </MDBox>
      </Grid>

      <MDBox pt={3}>
      <HoldingTable holdings={holdings} />
        {/* <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        /> */}
      </MDBox>

      {selectedHolding && (
        <EditHoldingModal
          showModal={showEditHoldingModal}
          handleClose={handleCloseEditHoldingModal}
          handleEdit={handleEditHolding}
          handleDelete={handleDeleteHolding}
          holding={selectedHolding}
          portfolio_id={portfolio_id}
        />
      )}

      <AddHoldingDialog
        showDialog={showAddHoldingDialog}
        handleClose={handleCloseAddHoldingDialog}
        handleAdd={handleAddHolding}
        portfolio_id={portfolio_id}
      />
    </>
  );
};

export default Holdings;

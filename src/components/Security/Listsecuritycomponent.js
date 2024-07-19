// CRUDComponent.js

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Link } from "react-router-dom";
import PortfolioApi from "../../api/api";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MaterialTheme/MDButton";
import MDBox from "components/MaterialTheme/MDBox";
import Grid from "@mui/material/Grid";
import Dropdown from '../controlcomponent/securitydropdown';


const SecurityComponent = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await PortfolioApi.getSecurities();
      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const ActionsRenderer = (props) => {
    const handleEditClick = () => {
      // Implement edit logic
      console.log("Edit clicked for ID:", props.data.id);
    };

    const handleDeleteClick = () => {
      // Implement delete logic
      console.log("Delete clicked for ID:", props.data.id);
    };

    return (
      <div>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    );
  };
  const columnDefs = [
    { headerName: "ID", field: "_id", sortable: true, filter: true },
    { headerName: "Name", field: "shortname", sortable: true, filter: true, editable: true },
    { headerName: "Description", field: "longname", sortable: true, filter: true, editable: true },
    { headerName: "Symbol", field: "symbol", sortable: true, filter: true, editable: true },
    { headerName: "Exchange", field: "exchange", sortable: true, filter: true, editable: true },
    { headerName: "Industry", field: "industry", sortable: true, filter: true, editable: true },
    { headerName: "Actions", field: "_id", cellRenderer: ActionsRenderer, flex: 1 },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <Link className="symbolLink" to="/addsecurity">
          <Grid xs={3} container spacing={2}>
            <MDBox alignItems="right" pt={3} px={2} mb={2}>
              <MDButton variant="gradient" color="info" fullWidth>
                Add New Security
              </MDButton>
            </MDBox>
          </Grid>
        </Link>
        
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="single"
          suppressRowClickSelection={true}
          deltaRowDataMode={true}
          onCellValueChanged={async (event) => {
            try {
              await axiosClient.put(`/security/${event.data._id}`, event.data);
              fetchData();
            } catch (error) {
              console.error("Error updating item:", error);
            }
          }}
          onGridReady={onGridReady}
          frameworkComponents={{}}
        ></AgGridReact>
      </div>
    </DashboardLayout>
  );
};

export default SecurityComponent;

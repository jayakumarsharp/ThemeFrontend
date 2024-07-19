import React, { useState,useEffect  } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PortfolioApi from "../../api/api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import Dropdown from "../controlcomponent/securitydropdown";

const HeatMapComponent = () => {
  // have to call API and put data
  const [selectedOption, setSelectedOption] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [secrowData, setsecrowData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const fetchSecData = async () => {
    try {
      const response = await PortfolioApi.getSecurities();
      setsecrowData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSecData();
  }, []);

  const handleSelectChange = (selected) => {
    console.log('selected',selected);
    setSelectedOption(selected);
  };

  const handleButtonClick =async () => {
    if (selectedOption) {
      console.log("Selected Option:", selectedOption);

  
      const response = await PortfolioApi.getpricehistoryforsecurity({ name: selectedOption.value });
      console.log(response.res);
      debugger;
      setRowData(response.res);
      // Handle the selected option data here
    } else {
      alert("Please select an option.");
    }
  };

  const fetchData = async () => {
    try {
      console.log(searchQuery);
      const response = await PortfolioApi.getpricehistoryforsecurity({ name: searchQuery });
      console.log(response.res);
      debugger;
      setRowData(response.res);

      //setjsonData(fundamentalsTimeSeries.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    // Trigger fetchData when search button is clicked
    fetchData();
  };

  // const columnDefs = [
  //   { headerName: "ID", field: "jan", sortable: true, filter: true },
  //   { headerName: "close", field: "feb", sortable: true, filter: true, editable: true },
  // ];
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const numberValueFormatter = (params) => {
    if (params.value !== undefined && params.value !== "NA") {
      return Number(params.value).toFixed(2);
    } else {
      return "NA";
    }
  };
  const growthCellStyle = (params) => {
    let value = parseFloat(params.value);
    let color = "lightgray";

    if (!isNaN(value)) {
      if (value < 0) {
        color = "red"; // Negative values in red
      } else {
        if (value > 25) {
          color = "darkgreen"; // Dark green for growth > 25%
        } else if (value >= 15 && value <= 25) {
          color = "green"; // Normal green for growth between 15% to 25%
        } else {
          color = "lightgreen"; // Light green for growth < 15%
        }
      }
    }

    return { color: "white", backgroundColor: color };
  };

  const columnDefs = [
    {
      headerName: "Year",
      field: "year",
      sortable: true,
      filter: true,
      editable: false,
      width: 100,
    },

    ...months.map((month) => ({
      headerName: month.toUpperCase(),
      field: `growth.${month}`,
      sortable: true,
      filter: false,
      editable: false,
      cellStyle: growthCellStyle, // Function for growth cell style
      valueFormatter: numberValueFormatter, // Formatter for numeric values
    })),
    {
      headerName: "Yearly Growth",
      field: "yearlyGrowth",
      sortable: true,
      filter: false,
      editable: false,
      cellStyle: growthCellStyle, // Function for growth cell style
      valueFormatter: numberValueFormatter, // Formatter for numeric values
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <Dropdown options={secrowData} onSelectChange={handleSelectChange} />
        <button onClick={handleButtonClick}>Get Selected Option</button>
        <button onClick={handleSearch}>Search</button>
     
      </div>

      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        {/* <Link className="symbolLink" to="/addsecurity">
          <Grid xs={3} container spacing={2}>
            <MDBox alignItems="right" pt={3} px={2} mb={2}>
              <MDButton variant="gradient" color="info" fullWidth>
                Add New Security
              </MDButton>
            </MDBox>
          </Grid>
        </Link> */}
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="single"
          suppressRowClickSelection={true}
          domLayout="autoHeight" // Ensure cells fit height automatically
          onGridReady={onGridReady}
          frameworkComponents={{}}
        ></AgGridReact>
      </div>
    </DashboardLayout>
  );
};

export default HeatMapComponent;

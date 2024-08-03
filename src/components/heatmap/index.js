import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PortfolioApi from "../../api/api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Dropdown from "../controlcomponent/securitydropdown";

const HeatMapComponent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [secrowData, setsecrowData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [cagrData, setCagrData] = useState(null);
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
    console.log("selected", selected);
    setSelectedOption(selected);
  };

  const handleButtonClick = async () => {
    if (selectedOption) {
      if (!fromDate || !toDate) {
        alert("Please select both from and to dates.");
        return;
      }

      console.log("Selected Option:", selectedOption);

      const response = await PortfolioApi.getpricehistoryforsecurity({
        symbol: selectedOption.value,
        fromDate,
        toDate,
      });

      console.log(response.res);
      setRowData(response.res.prices);
      setCagrData(response.res.cagr);
      const apiresponse = await PortfolioApi.getATHpricelistbySymbol({
        symbol: selectedOption.value,
        fromDate,
        toDate,
      });
      console.log("getATHpricelistbySymbol", apiresponse);
    } else {
      alert("Please select an option.");
    }
  };

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
  function formatCAGR(value, decimalPlaces = 2) {
    if (isNaN(value)) return "NA";
    return value.toFixed(decimalPlaces);
  }
  const growthCellStyle = (params) => {
    let value = parseFloat(params.value);
    let color = "lightgray";

    if (!isNaN(value)) {
      if (value < 0) {
        if (value <= -25 && value >= -50) color = "red";
        else if (value < -50) color = "darkred";
        else color = "#f29393";
      } else {
        if (value > 25) color = "darkgreen"; // Dark green for growth > 25%
        else if (value >= 15 && value <= 25)
          color = "green"; // Normal green for growth between 15% to 25%
        else color = "lightgreen"; // Light green for growth < 15%
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
    },
    ...months.map((month) => ({
      headerName: month.toUpperCase(),
      field: `growth.${month}`,
      sortable: true,
      filter: false,
      editable: false,
      cellStyle: growthCellStyle,
      valueFormatter: numberValueFormatter,
    })),
    {
      headerName: "Yearly Growth",
      field: "yearlyGrowth",
      sortable: true,
      filter: false,
      editable: false,
      cellStyle: growthCellStyle,
      valueFormatter: numberValueFormatter,
    },
  ];

  const columnDefs1 = [
    {
      headerName: "Year",
      field: "year",
      sortable: true,
      filter: true,
      editable: false,
    },
    ...months.map((month) => ({
      headerName: month.toUpperCase(),
      field: `${month}`,
      sortable: true,
      filter: false,
      editable: false,
      valueFormatter: numberValueFormatter,
    })),
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const onGridReady1 = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <div>
          <label>From Date:</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <label>To Date:</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <Dropdown options={secrowData} onSelectChange={handleSelectChange} />
        <button onClick={handleButtonClick}>Search</button>
      </div>
      <div className="ag-theme-alpine" style={{ width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="single"
          suppressRowClickSelection={true}
          domLayout="autoHeight"
          onGridReady={onGridReady}
        ></AgGridReact>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs1}
          rowSelection="single"
          suppressRowClickSelection={true}
          domLayout="autoHeight"
          onGridReady={onGridReady1}
        ></AgGridReact>

        {cagrData ? (
          <div>
            <h2>CAGR Values</h2>
            <ul>
              <li>
                <strong>CAGR 1 Year:</strong> {formatCAGR(cagrData.CAGR_1yr)}
              </li>
              <li>
                <strong>CAGR 3 Year:</strong> {formatCAGR(cagrData.CAGR_3yr)}
              </li>
              <li>
                <strong>CAGR 5 Year:</strong> {formatCAGR(cagrData.CAGR_5yr)}
              </li>
              <li>
                <strong>CAGR 10 Year:</strong> {formatCAGR(cagrData.CAGR_10yr)}
              </li>
            </ul>
          </div>
        ) : (
          <p>No CARG data found.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default HeatMapComponent;

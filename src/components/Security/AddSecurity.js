import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axiosClient from "../axios";
import SecuritySearchdata from "./searchresultdata";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MaterialTheme/MDBox";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MaterialTheme/MDButton";

const AddSecurityForm = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [exchange, setExchange] = useState("");
  const [ticker, setTicker] = useState("");
  const [currency, setCurrency] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      console.log(searchQuery);
      const response = await axiosClient.post("/search", {
        name: searchQuery,
      });

      // const jsonData = response.json();
      if (response.data.quotes.length > 0) {
        console.log("data pri");
        const result = SecuritySearchdata({ response });
        console.log(result);
        setColumns(result.columns);
        setRows(result.rows);
      }

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    // Trigger fetchData when search button is clicked
    fetchData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/security", {
        name: name,
        description,
        symbol,
        exchange,
        currency,
        ticker,
      });
      console.log(response.data); // Assuming the API returns some response
      // Optionally, you can reset the form after successful submission
      setName("");
      setSymbol("");
      setDescription("");
    } catch (error) {
      console.error("Error adding security:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <h1>Add Security</h1>
      <div>
        {/* <MDBox sx={{ display: "flex", justifyContent: "space-between" }}> */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query"
          />
          <button onClick={handleSearch}>Search</button>
          {/* <MDBox display="flex" justifyContent="space-between" alignItems="right" pt={3} px={2}>
            <MDButton variant="gradient" color="blue" onClick={handleSearch} fullWidth>
              Search
            </MDButton>
          </MDBox> */}
        {/* </MDBox> */}
        {data ? (
          <Card>
            <MDBox pt={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        ) : (
          <p>No data found.</p>
        )}
      </div>

      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Security Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="symbol">Symbol:</label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="exchange">Exchange:</label>
          <input
            type="text"
            id="exchange"
            value={exchange}
            onChange={(e) => setExchange(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="currency">Currency:</label>
          <input
            type="text"
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ticker">Ticker:</label>
          <input
            type="text"
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form> */}
    </DashboardLayout>
  );
};

export default AddSecurityForm;

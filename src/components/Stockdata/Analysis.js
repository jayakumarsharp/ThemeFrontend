import React, { useState, useContext } from "react";
import ChartComponent from "./ChartComponent";
import DynamicTable from "./DynamicTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PortfolioApi from "../../api/api";

const AnalyticsComponent = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [exchange, setExchange] = useState("");
  const [ticker, setTicker] = useState("");
  const [currency, setCurrency] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [jsonData, setjsonData] = useState(null);

  const fetchData = async () => {
    try {
      console.log(searchQuery);
      const response = await PortfolioApi.getchart({ name: searchQuery });
      console.log(response);
      const quoteSummary = await PortfolioApi.quoteSummary({
        name: searchQuery,
      });
      console.log(quoteSummary);
      // const fundamentalsTimeSeries = await PortfolioApi.fundamentalsTimeSeries({
      //   name: searchQuery,
      // });
      // console.log(fundamentalsTimeSeries);

      const historical = await PortfolioApi.getHistorical({
        name: searchQuery,
      });
      console.log(historical);

      // const jsonData = response.json();
      setData(response.data.quotes);
      //setjsonData(fundamentalsTimeSeries.data);
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
      const response = await PortfolioApi.security({
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
      <div>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query"
          />
          <button onClick={handleSearch}>Search</button>
          {data ? (
            <div>
              <ChartComponent data={data} />
              {/* <FinancialChart data={data} /> */}
            </div>
          ) : (
            <p>No data found.</p>
          )}
        </div>
        <DynamicTable data={jsonData} />
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsComponent;

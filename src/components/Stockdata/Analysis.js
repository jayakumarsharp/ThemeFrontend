import React, { useState, useEffect } from "react";
import StockChart from "./ChartComponent";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PortfolioApi from "../../api/api";
import Dropdown from "../controlcomponent/securitydropdown";

const AnalyticsComponent = () => {
  const [secrowData, setSecrowData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState(null);

  const fetchSecData = async () => {
    try {
      const response = await PortfolioApi.getSecurities();
      setSecrowData(response.data);
    } catch (error) {
      console.error("Error fetching securities data:", error);
    }
  };

  useEffect(() => {
    fetchSecData();
  }, []);

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const fetchData = async () => {
    if (!selectedOption || !selectedOption.value) {
      console.error("No security selected");
      return;
    }

    try {
      const response = await PortfolioApi.getchart({ name: selectedOption.value });
      if (response && response.data && response.data.quotes) {
        setData(response.data.quotes);
        console.log(response.data.quotes)

      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    }
  };

  const handleSearch = () => {
    fetchData();
  };
  const sampleData = [
    { date: new Date('2023-01-01'), close: 100 },
    { date: new Date('2023-02-01'), close: 120 },
    { date: new Date('2023-03-01'), close: 110 },
    { date: new Date('2023-04-01'), close: 130 },
    { date: new Date('2023-05-01'), close: 105 },
  ];

  const chartProps = {
    data: sampleData,
    width: 600,
    height: 400,
    theme: 'dark', // or 'light'
    indicators: [
      { type: 'MA', ...maConfig },
      // Add other indicators as needed
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <Dropdown options={secrowData} onSelectChange={handleSelectChange} />
        <button onClick={handleSearch}>Search</button>
        <StockChart {...chartProps} />
        {/* {data ? (
          <StockChart {...chartProps} />
        ) : (
          <p>No data found.</p>
        )} */}
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsComponent;

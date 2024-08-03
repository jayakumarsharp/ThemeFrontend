import React from "react";
import { Link } from "react-router-dom";
import MDTypography from "components/MaterialTheme/MDTypography";

const Holdingdata = ({ holdings }) => {
  const columns = [
    { Header: "symbol", accessor: "symbol", width: "45%", align: "left" },
    { Header: "Qty", accessor: "quantity", align: "center" },
    { Header: "Avg Buy price", accessor: "average_buy_price", align: "center" },
    { Header: "Invested", accessor: "total_invested", align: "center" },
    { Header: "LTP", accessor: "regular_market_price", align: "center" },
    { Header: "Current value", accessor: "today_value", align: "center" },
    { Header: "Unrealized P&L(%)", accessor: "percent", align: "center" },
  ];
  const rows = holdings.map((item) => ({
    symbol: (
      <Link className="symbolLink" to={`/detailed?symbol=${item.symbol}`}>
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {item.symbol}
        </MDTypography>
      </Link>
    ),
    quantity: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {item.quantity}
      </MDTypography>
    ),
    average_buy_price: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {item.average_buy_price}
      </MDTypography>
    ),
    total_invested: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {item.total_invested}
      </MDTypography>
    ),
    today_value: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {item.today_value}
      </MDTypography>
    ),
    percent: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {item.gain_loss_percent}
      </MDTypography>
    ),
    regular_market_price: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {item.regular_market_price}
      </MDTypography>
    ),
  }));

  return { columns, rows };
};

export default Holdingdata;

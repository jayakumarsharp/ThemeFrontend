// Material Dashboard 2 React components
import MDTypography from "components/MaterialTheme/MDTypography";
import { debug } from "util";
import { Link, useNavigate } from "react-router-dom";

const Holdingdata = ({ holdings }) => {
  const columns = [
    { Header: "symbol", accessor: "symbol", width: "45%", align: "left" },
    { Header: "shortName", accessor: "shortName", align: "left" },
    { Header: "shares_owned", accessor: "shares_owned", align: "center" },
    {
      Header: "price",
      accessor: "price",
      align: "center",
    },
    {
      Header: "change",
      accessor: "change",
      align: "center",
    },
    { Header: "percent", accessor: "percent", align: "center" },
    { Header: "value", accessor: "value", align: "center" },
  ];

  const rows = holdings.map((item) => ({
    symbol: (
      <Link className="symbolLink" to={`/detailed?symbol=${item.symbol}`}>
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.symbol}
        </MDTypography>
      </Link>
    ),
    shortName: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.shortName}
      </MDTypography>
    ),
    shares_owned: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.shares_owned}
      </MDTypography>
    ),
    price: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.price}
      </MDTypography>
    ),
    change: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.change}
      </MDTypography>
    ),
    percent: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.percent}
      </MDTypography>
    ),

    value: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.value}
      </MDTypography>
    ),
  }));
  return { columns, rows };
};

export default Holdingdata;

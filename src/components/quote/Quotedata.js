// Material Dashboard 2 React components
import MDBox from "components/MaterialTheme/MDBox";
import MDTypography from "components/MaterialTheme/MDTypography";
import MDAvatar from "components/MaterialTheme/MDAvatar";
import MDBadge from "components/MaterialTheme/MDBadge";

const Quotedata = ({ data }) => {
  debugger;
  const { data: dataArray } = data;
  const columns = [
    { Header: "symbol", accessor: "symbol", width: "45%", align: "left" },
    { Header: "shortName", accessor: "shortName", align: "left" },
    { Header: "regularMarketPrice", accessor: "regularMarketChange", align: "center" },
    {
      Header: "regularMarketChangePercent",
      accessor: "regularMarketChangePercent",
      align: "center",
    },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const rows = data.map((item) => ({
    
    symbol: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.symbol}
      </MDTypography>
    ),
    shortName: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.shortName}
      </MDTypography>
    ),
    regularMarketPrice: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.regularMarketPrice}
      </MDTypography>
    ),
    regularMarketChangePercent: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.regularMarketChangePercent}
      </MDTypography>
    ),
    action: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        Edit
      </MDTypography>
    ),
  }));
  return { columns, rows };
};

export default Quotedata;

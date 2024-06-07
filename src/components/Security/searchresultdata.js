import MDTypography from "components/MaterialTheme/MDTypography";

const SecuritySearchdata = ({ response }) => {
  const columns = [
    { Header: "symbol", accessor: "symbol", align: "left" },
    { Header: "shortName", accessor: "shortName", align: "left" },
    { Header: "regularMarketPrice", accessor: "regularMarketPrice", align: "center" },
    {
      Header: "regularMarketChangePercent",
      accessor: "regularMarketChangePercent",
      align: "center",
    },
    { Header: "action", accessor: "action", align: "center" },
  ];
  debugger;
  console.log(response.data.quotes);
  const rows = response.data.quotes.filter(parameter => parameter.quoteType &&  parameter.quoteType.includes("EQUITY")).map((item) => ({
    symbol: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.industry}
      </MDTypography>
    ),
    shortName: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.exchDisp}
      </MDTypography>
    ),
    regularMarketPrice: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.industry}
      </MDTypography>
    ),
    regularMarketChangePercent: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {item.longname}
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

export default SecuritySearchdata;

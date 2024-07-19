import MDTypography from "components/MaterialTheme/MDTypography";
import MDButton from "components/MaterialTheme/MDButton";

const SecuritySearchdata = ({ response, handleUpdate }) => {
  const columns = [
    { Header: "symbol", accessor: "symbol", align: "left" },
    { Header: "shortName", accessor: "shortName", align: "left" },
    { Header: "regularMarketPrice", accessor: "regularMarketPrice", align: "center" },
    {
      Header: "quoteType",
      accessor: "regularMarketChangePercent",
      align: "center",
    },
    { Header: "action", accessor: "action", align: "center" },
  ];

  console.log(response.quotes);
  const rows = response.quotes
    .filter((parameter) => parameter.quoteType && parameter.quoteType.includes("EQUITY"))
    .map((item) => ({
      symbol: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.symbol}
        </MDTypography>
      ),
      shortName: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.shortname}
        </MDTypography>
      ),
      quoteType: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.quoteType}
        </MDTypography>
      ),
      industry: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.industry}
        </MDTypography>
      ),
      action: (
        <MDButton
          onClick={() => handleUpdate(item)}
          variant="outlined"
          color="primary"
          size="small"
        >
          Save
        </MDButton>
      ),
    }));

  return { columns, rows };
};

export default SecuritySearchdata;

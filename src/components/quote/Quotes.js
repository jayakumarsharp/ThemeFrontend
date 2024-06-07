import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "@mui/material";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import PortfolioApi from "../../api/api";
import { toDecimalHundredths } from "../../helpers/formatter";
import Quotedata from "./Quotedata";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MaterialTheme/MDBox";
import MDTypography from "components/MaterialTheme/MDTypography";
import DataTable from "examples/Tables/DataTable";

const Quotes = ({ label, headerLink, symbols, showSymbol, showName }) => {
  const [quotes, setQuotes] = useState([]);
  const isMountedRef = useIsMountedRef();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getQuotes() {
      if (symbols && symbols.length > 0) {
        const data = await PortfolioApi.getQuote({ symbols });
        if (isMountedRef.current) {
          //workout data
          setQuotes(data);
          if (data.length > 0) {
            console.log("data pri");
            const result = Quotedata({ data });
            console.log(result);
            setColumns(result.columns);
            setRows(result.rows);
          }

          //
          // console.log(finaldata);
        }
      }
    }
    getQuotes();
  }, [symbols, isMountedRef]);

  const marketChangeColor = (number) => {
    if (number < 0) return "red";
    else if (number > 0) return "green";
    else return "black";
  };

  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              {headerLink ? (
                <Link color="white" to={headerLink}>
                  <MDTypography variant="h5" color="white">
                    {" "}
                    {label}{" "}
                  </MDTypography>
                </Link>
              ) : (
                label
              )}
            </MDBox>
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

          {/* <Table className="Quotes" responsive>
            <thead>
              <tr>
                <th className="headerTitle">
                  {headerLink ? (
                    <Link className="symbolLink" to={headerLink}>
                      {label}
                    </Link>
                  ) : (
                    label
                  )}
                </th>
                <th className="headerMarketPrice">PRICE</th>
                <th className="headerMarketChange">DAY CHANGE (%)</th>
              </tr>
            </thead>
            <tbody>
              {quotes.length > 0 ? (
                quotes.map(
                  (
                    {
                      symbol,
                      shortName,
                      regularMarketPrice,
                      regularMarketChange,
                      regularMarketChangePercent,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <td className="shortName">
                        {showSymbol && (
                          <Link className="symbolLink" to={`/detailed?symbol=${symbol}`}>
                            {symbol}
                          </Link>
                        )}{" "}
                        {showName && shortName}
                      </td>
                      <td className="regularMarketPrice">
                        {toDecimalHundredths(regularMarketPrice)}
                      </td>
                      <td
                        className="regularMarketChange"
                        style={{ color: marketChangeColor(regularMarketChange) }}
                      >
                        {toDecimalHundredths(regularMarketChange)}{" "}
                        <span className="percentText">
                          ({toDecimalHundredths(regularMarketChangePercent)}%)
                        </span>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td className="shortName">No symbols found...</td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </Table> */}
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Quotes;

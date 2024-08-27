import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import axios from "axios";
import { debug } from "util";

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);


  const handleExpandClick = async (rowData) => { // Pass rowData as argument
    setOpen(!open);
    debugger;
    if (!open && rowData) {
      setLoading(true);
      try {
        console.log(rowData)
        // Assuming `PortfolioApi.getHoldingbypfandsecurity` fetches details based on row data
        // const response = await PortfolioApi.getHoldingbypfandsecurity(rowData); // Use rowData
        // setDetails(response.data);
      } catch (error) {
        console.error("Error fetching details", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="right" >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpandClick(row)} // Pass row data on click
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          <Typography variant="body2" fontWeight="bold">
            {row.symbol}
          </Typography>
        </TableCell>
        <TableCell align="right" >
          <Typography variant="body2">{row.quantity}</Typography>
        </TableCell>
        <TableCell align="right" >
          <Typography variant="body2">{row.average_buy_price}</Typography>
        </TableCell>
        <TableCell align="right"  >
          <Typography variant="body2">{row.total_invested}</Typography>
        </TableCell>
        <TableCell align="right"  >
          <Typography variant="body2">{row.regular_market_price}</Typography>
        </TableCell>
        <TableCell align="right"  >
          <Typography variant="body2">{row.today_value}</Typography>
        </TableCell>
        <TableCell align="right" >
          <Typography variant="body2">
            {row.gain_loss_percent.toFixed(2)}%
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              {loading ? (
                <CircularProgress />
              ) : details ? (
                <>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Detailed Information
                  </Typography>
                  <Table size="small" aria-label="details">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Executed Price
                        </TableCell>
                        <TableCell align="right">
                          {details.executed_price}
                        </TableCell>
                      </TableRow>
                      {/* Add more detailed rows dynamically as needed */}
                      {details.other_data && details.other_data.map((detail, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {detail.label}
                          </TableCell>
                          <TableCell align="right">
                            {detail.value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No details available
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const HoldingTable = ({ holdings }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table aria-label="holding table">

        <TableRow>
          <TableCell padding="checkbox" sx={{ width: '5%' }} />
          <TableCell align="left" sx={{ width: '20%' }}>
            <Typography variant="subtitle2" color="textSecondary">
              Symbol
            </Typography>
          </TableCell>
          <TableCell align="right" sx={{ width: '10%' }}>
            <Typography variant="subtitle2" color="textSecondary">
              Qty
            </Typography>
          </TableCell>
          <TableCell align="right" sx={{ width: '15%' }}>
            <Typography variant="subtitle2" color="textSecondary">
              Avg Buy Price
            </Typography>
          </TableCell>
          <TableCell align="right" sx={{ width: '15%' }}>
            <Typography variant="subtitle2" color="textSecondary">
              Invested
            </Typography>
          </TableCell>
          <TableCell align="right" sx={{ width: '15%' }}>
            <Typography variant="subtitle2" color="textSecondary">
              LTP
            </Typography>
          </TableCell>
          <TableCell align="right" sx={{ width: '10%' }}>
            <Typography variant="subtitle2" color="textSecondary">
              Current Value
            </Typography>
          </TableCell>
          <TableCell align="right" sx={{ width: '10%' }}>
            <Typography variant="subtitle2" color="textSecondary">
              Unrealized P&L (%)
            </Typography>
          </TableCell>
        </TableRow>

        {holdings.map((holding) => (
          <Row key={holding.symbol} row={holding} />
        ))}

      </Table>
    </TableContainer>
  );
};

export default HoldingTable;

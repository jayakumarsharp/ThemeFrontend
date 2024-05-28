import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from '@mui/material';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import PortfolioApi from '../../api/api';
import { toDecimalHundredths } from '../../helpers/formatter';
import './Quotes.css'

const Quotes = ({ label, headerLink, symbols, showSymbol, showName }) => {
  const [quotes, setQuotes] = useState([]);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    async function getQuotes() {
      if (symbols && symbols.length > 0) {
        const data = await PortfolioApi.getQuote({ symbols });
        if (isMountedRef.current) {
          setQuotes(data);
        }
      }
    }
    getQuotes();
  }, [symbols, isMountedRef])

  const marketChangeColor = (number) => {
    if (number < 0)
      return 'red';
    else if (number > 0)
      return 'green';
    else
      return 'black';
  }

  return (
    // <>
    <Table className="Quotes" responsive>
      <thead>
        <tr>
          <th className="headerTitle">{headerLink ? <Link className="symbolLink" to={headerLink}>{label}</Link> : label}</th>
          <th className="headerMarketPrice">PRICE</th>
          <th className="headerMarketChange">DAY CHANGE (%)</th>
        </tr>
      </thead>
      <tbody>
        {quotes.length > 0
          ? quotes.map(({ symbol, shortName, regularMarketPrice, regularMarketChange, regularMarketChangePercent }, index) => (
            <tr key={index}>
              <td className="shortName">{showSymbol && <Link className="symbolLink" to={`/detailed?symbol=${symbol}`}>{symbol}</Link>} {showName && shortName}</td>
              <td className="regularMarketPrice">{toDecimalHundredths(regularMarketPrice)}</td>
              <td className="regularMarketChange" style={{ color: marketChangeColor(regularMarketChange) }}>{toDecimalHundredths(regularMarketChange)} <span className="percentText">({toDecimalHundredths(regularMarketChangePercent)}%)</span></td>
            </tr>
          ))
          :
          <tr>
            <td className="shortName">No symbols found...</td>
            <td></td>
            <td></td>
          </tr>
        }
      </tbody>
    </Table>
    // </>
  )
}

export default Quotes;
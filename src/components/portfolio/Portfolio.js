import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {  Table, Button } from "@mui/material";
import { useAuth } from "hooks/useAuth";
import PortfolioApi from "../../api/api";
import DeletePortfolioModal from "./DeletePortfolioModal";
import EditNameModal from "./EditNameModal";
import Notes from "./Notes";
import Holdings from "../holding/Holdings";
import UpdateCashModal from "./UpdateCashModal";
import { toDecimalHundredths } from "../../helpers/formatter";
import "./Portfolio.css";

const Portfolio = () => {
  const { currentUser, refresh } = useAuth();
  const { go } = useNavigate();
  const { id } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [totalValue, setTotalValue] = useState([]);
  const [displayObject, setDisplayObject] = useState([]);
  const [portfolio, setPortfolio] = useState(
    currentUser?.portfolios?.find((p) => p.id === Number(id))
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditCashModal, setShowEditCashModal] = useState(false);

  useEffect(() => {
    if (portfolio) {
      setHoldings(portfolio?.holdings);
    }
  }, [portfolio]);

  useEffect(() => {
    async function getQuote() {
      if (holdings && holdings.length > 0) {
        const symbols = holdings.map((h) => h.symbol);
        const data = await PortfolioApi.getQuote({ symbols });
        setQuotes(data);
      }
    }
    getQuote();
  }, [holdings]);

  useEffect(() => {
    if (quotes?.length && holdings?.length) {
      // console.log(quotes);
      // console.log(holdings);
      const combined = holdings.map((h) => {
        let data = quotes.find((q) => q.symbol === h.symbol);
        if (data) {
          const {
            symbol,
            shortName,
            regularMarketPrice,
            regularMarketChange,
            regularMarketChangePercent,
          } = data;
          let id = h.id;
          let shares_owned = Number(h.shares_owned);
          let price = regularMarketPrice;
          let change = regularMarketChange;
          let percent = regularMarketChangePercent;
          let value = Number(shares_owned) * Number(price) ?? 0;
          return { id, symbol, shortName, shares_owned, price, change, percent, value };
        }
        return null;
      });
      // console.log(combined);
      const totalValue = combined.reduce((prev, next) => prev + (next?.value ?? 0), 0);
      setDisplayObject(combined);
      setTotalValue(Number(totalValue));
    }
  }, [quotes, holdings, portfolio]);

  const handleDeleteWarning = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleEditNamePopup = () => setShowEditNameModal(true);
  const handleCloseEditNameModal = () => setShowEditNameModal(false);
  const handleEditCashPopup = () => setShowEditCashModal(true);
  const handleCloseEditCashModal = () => setShowEditCashModal(false);
  const handleEditPortfolio = async (data) => {
    try {
      let updated = await PortfolioApi.updatePortfolio(id, data);
      setPortfolio(updated.portfolio);
      await refresh(currentUser.username);
      // return { success: true }
      go(`/portfolio/${id}`);
    } catch (errors) {
      return { success: false, errors };
    }
  };

  return (
    <div>
      <h1>{portfolio ? portfolio.name : "Invalid Portfolio..."}</h1>
      {portfolio && (
        <>
          <h6>
            <span>
              <Button className="edit" onClick={handleEditNamePopup} /> Edit portfolio name
            </span>
            <span className="ms-3">
              <Button className="trash" onClick={handleDeleteWarning} /> Delete portfolio
            </span>
          </h6>
          <Holdings
            holdings={displayObject}
            setHoldings={setHoldings}
            portfolio_id={portfolio?.id}
          />
          <Table responsive>
            <thead>
              <tr>
                <th className="headerTitle">Cash</th>
                <th className="headerMarketPrice"></th>
                <th className="headerMarketPrice"></th>
                <th className="headerMarketChange"></th>
                <th className="headerMarketChange"></th>
                {/* <th className="headerMarketChange"></th> */}
                {/* <th className="headerMarketChange"></th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="shortName"></td>
                <td className="regularMarketPrice"></td>
                <td className="regularMarketPrice"></td>
                <td className="regularMarketChange"></td>
                <td className="regularMarketChange">{portfolio?.cash}</td>
                {/* <td className="regularMarketChange"></td> */}
                {/* <td className="regularMarketChange"></td> */}
              </tr>
              <tr>
                <td className="shortName"></td>
                <td className="regularMarketPrice"></td>
                <td className="regularMarketPrice"></td>
                <td className="regularMarketChange"></td>
                <td className="regularMarketChange">
                  <Link to="#" onClick={handleEditCashPopup}>
                    Update Cash
                  </Link>
                </td>
                {/* <td className="regularMarketChange"></td> */}
                {/* <td className="regularMarketChange"></td> */}
              </tr>
            </tbody>
          </Table>
          <Table responsive>
            <thead>
              <tr>
                <th className="headerTitle">Total Value</th>
                <th className="headerMarketPrice"></th>
                <th className="headerMarketPrice"></th>
                <th className="headerMarketChange"></th>
                <th className="headerMarketChange"></th>
                {/* <th className="headerMarketChange"></th> */}
                {/* <th className="headerMarketChange"></th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="shortName"></td>
                <td className="regularMarketPrice"></td>
                <td className="regularMarketPrice"></td>
                <td className="regularMarketChange"></td>
                <td className="regularMarketChange">
                  {toDecimalHundredths(totalValue + Number(portfolio?.cash))}
                </td>
                {/* <td className="regularMarketChange"></td> */}
                {/* <td className="regularMarketChange"></td> */}
              </tr>
            </tbody>
          </Table>
          <Notes handleEdit={handleEditPortfolio} portfolio={portfolio} />
          <DeletePortfolioModal
            id={id}
            showModal={showDeleteModal}
            handleClose={handleCloseDeleteModal}
          />
          <EditNameModal
            showModal={showEditNameModal}
            handleClose={handleCloseEditNameModal}
            handleEdit={handleEditPortfolio}
            portfolio={portfolio}
          />
          <UpdateCashModal
            showModal={showEditCashModal}
            handleClose={handleCloseEditCashModal}
            handleEdit={handleEditPortfolio}
            portfolio={portfolio}
          />
        </>
      )}
    </div>
  );
};

export default Portfolio;

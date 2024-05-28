import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from  '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import PortfolioApi from '../../api/api';
import { toDecimalHundredths } from '../../helpers/formatter';
import './Holdings.css'
import EditHoldingModal from './EditHoldingModal';
import AddHoldingModal from './AddHoldingModal';
import { Button } from '@mui/material';

const Holdings = ({ holdings, portfolio_id }) => {
  const { currentUser, refresh } = useAuth();
  const { go } = useNavigate();
  const [showEditHoldingModal, setShowEditHoldingModal] = useState(false);
  const [showAddHoldingModal, setShowAddHoldingModal] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);

  const handleEditHoldingPopup = (id) => {
    if (id) {
      setSelectedHolding(holdings.find(h => h.id === id));
      setShowEditHoldingModal(true);
    }
  };

  const handleCloseEditHoldingModal = () => {
    setSelectedHolding(null);
    setShowEditHoldingModal(false)
  };

  const handleEditHolding = async (data) => {
    try {
      let updated = await PortfolioApi.updateHolding(selectedHolding.id, data);
      await refresh(currentUser.username);
      go(`/portfolio/${portfolio_id}`);
    } catch (errors) {
      return { success: false, errors }
    }
  }

  const handleDeleteHolding = async (id) => {
    let res = await PortfolioApi.deleteHolding(id);
    if (res === Number(id)) {
      await refresh(currentUser.username);
      go(`/portfolio/${portfolio_id}`);
    }
  }

  const handleAddHoldingPopup = () => setShowAddHoldingModal(true);
  const handleCloseAddHoldingModal = () => setShowAddHoldingModal(false);
  const handleAddHolding = async (data) => {
    try {
      let holding = await PortfolioApi.addHolding(data);
      if (holding.success) {
        await refresh(currentUser.username);
        go(`/portfolio/${portfolio_id}`);
      } else {
        let { errors } = holding;
        return { success: false, errors }
      }
    } catch (errors) {
      return { success: false, errors }
    }
  }

  const marketChangeColor = (number) => {
    if (number < 0)
      return 'red';
    else if (number > 0)
      return 'green';
    else
      return 'black';
  }

  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th className="headerTitle">Holdings</th>
            <th className="headerMarketPrice">SHARES OWNED</th>
            <th className="headerMarketPrice">PRICE</th>
            <th className="headerMarketChange">DAY CHANGE (%)</th>
            <th className="headerMarketChange">MARKET VALUE</th>
            {/* <th className="headerMarketChange">COST BASIS</th> */}
            {/* <th className="headerMarketChange">% ACCOUNT</th> */}
          </tr>
        </thead>
        <tbody>
          {holdings?.length > 0
            ? holdings.map(({ id, symbol, shortName, shares_owned, price, change, percent, value }) => (
              <tr key={id}>
                <td className="shortName"><Link className="symbolLink" to={`/detailed?symbol=${symbol}`}>{symbol}</Link> {shortName} <Button onClick={() => handleEditHoldingPopup(id)} /></td>
                <td className="regularMarketPrice">{shares_owned}</td>
                <td className="regularMarketPrice">{toDecimalHundredths(price)}</td>
                <td className="regularMarketChange" style={{ color: marketChangeColor(change) }}>{toDecimalHundredths(change)} <span className="percentText">({toDecimalHundredths(percent)}%)</span></td>
                <td className="regularMarketChange">{toDecimalHundredths(value)}</td>
                {/* <td></td> */}
                {/* <td></td> */}
              </tr>
            ))
            :
            <tr>
              <td className="shortName">No symbols found...</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              {/* <td></td> */}
              {/* <td></td> */}
            </tr>
          }
          <tr>
            <td className="shortName"><Link to="#" onClick={handleAddHoldingPopup}>++ Add holding ++</Link></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            {/* <td></td> */}
            {/* <td></td> */}
          </tr>
        </tbody>
      </Table>
      {selectedHolding ? <EditHoldingModal showModal={showEditHoldingModal} handleClose={handleCloseEditHoldingModal} handleEdit={handleEditHolding} handleDelete={handleDeleteHolding} holding={selectedHolding} portfolio_id={portfolio_id} /> : ""}
      <AddHoldingModal showModal={showAddHoldingModal} handleClose={handleCloseAddHoldingModal} handleAdd={handleAddHolding} portfolio_id={portfolio_id} />
    </>
  )
}

export default Holdings

import React from "react";
import { useAuth } from "../../hooks/useAuth";
import PortfolioApi from "../../api/api";
import MDBox from "components/MaterialTheme/MDBox";
import MDButton from "components/MaterialTheme/MDButton";
const Star = ({ symbol }) => {
  const { currentUser, refresh } = useAuth();

  const handleClick = async (action) => {
    try {
      if (action === "add") {
        await PortfolioApi.addToWatchlist(currentUser.username, symbol);
      } else if (action === "remove") {
        await PortfolioApi.removeFromWatchlist(currentUser.username, symbol);
      }
      refresh(currentUser.username);
    } catch (errors) {
      return { success: false, errors };
    }
  };

  if (!currentUser) return <></>;

  return (
    <>
      {currentUser?.watchlist?.includes(symbol) ? (
        <>
          <MDButton
            variant="gradient"
            color="warning"
            onClick={() => handleClick("remove")}
            fullWidth
          >
            Remove from watchlist
          </MDButton>
        </>
      ) : (
        <>
          <MDButton variant="gradient" color="success" onClick={() => handleClick("add")} fullWidth>
            Add to watchlist
          </MDButton>
        </>
      )}
    </>
  );
};

export default Star;

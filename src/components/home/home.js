import { Grid, Container, Typography, Box } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import Quotes from "../quote/Quotes";
import TrendingSymbols from "./TrendingSymbols";
import PortfolioSummary from "./PortfolioSummary";

const Home = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <Container>
      <h1>Summary</h1>
      {currentUser && (
        <Grid md="7">
          <PortfolioSummary />
        </Grid>
      )}
    
      <Grid md={currentUser ? 5 : 12}>
        <Quotes label="US Markets" symbols={['^GSPC', '^DJI', '^IXIC', '^RUT']} showSymbol={false} showName={true} />
        <Quotes label="Crytocurrencies" symbols={['BTC-USD', 'ETH-USD']} showSymbol={false} showName={true} />
        {currentUser &&
          <Quotes label="Watchlist" symbols={currentUser?.watchlist} showSymbol={true} showName={true} />
        }
        <TrendingSymbols />
      </Grid> 
    </Container>
  );
};

export default Home;

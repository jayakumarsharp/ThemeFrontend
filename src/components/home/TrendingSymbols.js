import { useState, useEffect } from 'react';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import PortfolioApi from '../../api/api';
import Quotes from '../quote/Quotes';

const TrendingSymbols = () => {
  const [trending, setTrending] = useState([]);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    async function getTrendingSymbols() {
      const data = await PortfolioApi.getTrendingSymbols();
      if (data?.count > 0) {
        if (isMountedRef.current) {
          setTrending(data.quotes.map(a => a.symbol));
        } else {
          setTrending([])
        }
      }
      getTrendingSymbols();
      return () => { isMountedRef.current = false }
    }
  }, [isMountedRef]);

  return (
    <>
      {trending.length > 0
        ? <Quotes label="Today's Trending Symbols" symbols={trending} showSymbol={true} showName={true} />
        : ""}
    </>
  )
}

export default TrendingSymbols

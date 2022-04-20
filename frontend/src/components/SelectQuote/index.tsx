import React from 'react';
import { useSymbols } from '../../contexts/symbols';

interface SelectQuoteProps {
  onChange: any;
}

const quotes = ["BNB", "BRL", "BTC", "GBP", "ETH", "EUR", "USD", "USDT"] 

const SelectQuote = ({onChange}:SelectQuoteProps) => {
  const { quote } = useSymbols();
  return (
  <React.Fragment>
  {/*@ts-ignore*/}
  <select id="selectQuote" className="form-select" value={quote} onChange={onChange}>
    <option value="FAVORITES">Favorites</option>
    {quotes.map(q => <option key={q} value={q}>{q}</option>)}
  </select>
  </React.Fragment>
)
};

export default SelectQuote;
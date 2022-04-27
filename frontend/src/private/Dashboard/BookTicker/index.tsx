import React from "react";
import SelectQuote from "../../../components/SelectQuote";
import { useSymbols } from "../../../contexts/symbols";
import BookRow from "./BookRow";

interface BookTickerProps {
  data: any;
}

const BookTicker = ({data}:BookTickerProps) => {
  if(!data) return null;

  const { changeQuoteBook, quoteBook, symbolsBook } = useSymbols();

  return (
    <React.Fragment>
        <div className="col-sm-12 col-md-6 mb-4">
            <div className="card border-0 shadow">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h2 className="fs-5 fw-bold mb-0">Order Book</h2>
                        </div>
                        <div className="col offset-md-3">
                            <SelectQuote onChange={changeQuoteBook} quote={quoteBook} />
                        </div>
                    </div>
                </div>
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-bottom col-2" scope="col">SYMBOL</th>
                                <th className="border-bottom col-2" scope="col">BID</th>
                                <th className="border-bottom col-2" scope="col">ASK</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                symbolsBook && symbolsBook.length
                                    ? symbolsBook.map(item => {
                                        const dataFinder = Array.isArray(data)? data.find((order: any) => order.symbol===item.symbol):{bestAsk:"0", bestBid:"0"};
                                        return <BookRow key={item.symbol} symbol={item.symbol} data={dataFinder} />
                                    })
                                    : <React.Fragment></React.Fragment>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </React.Fragment>
  );
}

export default BookTicker;
import React, { useEffect, useState } from 'react';
import SelectQuote from '../../../components/SelectQuote';
import { useSymbols } from '../../../contexts/symbols';
import TickerRow from './TickerRow';
import "../styles.css";

interface MiniTickerProps {
  data: any;
}

const MiniTicker= ({data}:MiniTickerProps) => {


  if(!data) return null;
  
  const { changeQuoteMiniTicker, quoteMiniTicker, symbolsMiniTicker } = useSymbols();

  return (
    <React.Fragment>
        <div className="col-12 mb-4">
            <div className="card border-0 shadow">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h2 className="fs-5 fw-bold mb-0">Market 24h</h2>
                        </div>
                        <div className="col offset-md-3">
                            <SelectQuote quote={quoteMiniTicker} onChange={changeQuoteMiniTicker} />
                        </div>
                    </div>
                </div>
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-bottom" scope="col">SYMBOL</th>
                                <th className="border-bottom col-2" scope="col">CLOSE</th>
                                <th className="border-bottom col-2" scope="col">OPEN</th>
                                <th className="border-bottom col-2" scope="col">HIGH</th>
                                <th className="border-bottom col-2" scope="col">LOW</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                symbolsMiniTicker && symbolsMiniTicker.length
                                ? symbolsMiniTicker.map(item => {
                                  return(
                                      <TickerRow key={item.symbol} symbol={item.symbol} data={data[item.symbol]} />
                                )})
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

export default MiniTicker;
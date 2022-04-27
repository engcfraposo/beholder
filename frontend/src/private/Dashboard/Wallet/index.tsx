import React from 'react';
import { useBalances } from '../../../contexts/balances';


const Wallet: React.FC = () => {
  const {balances} = useBalances()
  return (
    <React.Fragment>
        <div className="col-md-6 col-sm-12 mb-4">
            <div className="card border-0 shadow">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h2 className="fs-5 fw-bold mb-0">Wallet</h2>
                        </div>
                    </div>
                </div>
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-bottom" scope="col">SYMBOL</th>
                                <th className="border-bottom col-2" scope="col">FREE</th>
                                <th className="border-bottom col-2" scope="col">LOCK</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                balances && balances.length
                                    ? balances.map(item => (
                                        <tr key={`wallet${item.symbol}`}>
                                            <td className="text-gray-900">{item.symbol}</td>
                                            <td className="text-gray-900">{item.available.substring(0, 10)}</td>
                                            <td className="text-gray-900">{item.onOrder.substring(0, 10)}</td>
                                        </tr>
                                    ))
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

export default Wallet;
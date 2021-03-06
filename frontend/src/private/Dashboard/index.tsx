import React from 'react';
import Menu from '../../components/Menu';
import BookTicker from './BookTicker';
import CandleChart from './CandleChart';
import useDashboard from './hooks';
import MiniTicker from './MiniTicker';
import Wallet from './Wallet';

const Dashboard: React.FC = () => {
  
  const { tickerState, bookState } = useDashboard();
  return (
    <React.Fragment>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h1 className="h4">Dashboard</h1>
          </div>
          <div className="btn-toolbar mb-md-0">
            <div className="d-inline-flex align-items-center">
              
            </div>
            <div className="ms-2 ms-lg-3">
              
            </div>
          </div>
        </div>
        <CandleChart />
        <div className="row">
          <div className="col-12">
            <MiniTicker data={tickerState} />
          </div>
        </div>
        <div className="row">
          <BookTicker data={bookState} />
          <Wallet />
        </div>
      </main>

    </React.Fragment>
  );
}

export default Dashboard;
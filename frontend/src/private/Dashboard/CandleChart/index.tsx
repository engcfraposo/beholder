import useTradeView from './hooks';
import { useMemo } from 'react';

const CandleChart = () => {
  const {symbol} = useTradeView()
  const widgetHtml = useMemo(() => {
    return (
        <div className="row">
            <div className="col-12 mb-4">
                <div className="card cardDark border-0 shadow">
                    <div className="card-body p-2">
                        <div className="tradingview-widget-container ">
                            <div id="tradingview_d34df" className="divTradingView"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }, [symbol])
  return widgetHtml;
}

export default CandleChart;
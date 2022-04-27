import React, { useEffect, useState } from 'react';

const useTradeView = () => {
  const [widget, setWidget] = useState<any>({});
  const [symbol, setSymbol] = useState<string>('BTCUSDT');
    useEffect(() => {
        //@ts-ignore
        const w = new window.TradingView.widget({
            symbol: "BINANCE:" + symbol,
            autosize: true,
            interval: "1",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            details: true,
            withdateranges: true,
            hide_side_toolbar: false,
            studies: [
                "RSI@tv-basicstudies"
            ],
            container_id: "tradingview_d34df"
        });
        setWidget(w);
    }, [symbol])
  return {widget, symbol, setSymbol};
}

export default useTradeView;
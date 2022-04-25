import {useState} from 'react';
import useWebSocket from 'react-use-websocket';

const useDashboard = () => {
  const [tickerState, setTickerState] = useState({});
  const { lastJsonMessage } = useWebSocket(import.meta.env.VITE_APP_WS_URL, {
    onOpen: () => console.log('WebSocket connection opened'),
    onMessage: (_message: MessageEvent<any>) => {
      if(lastJsonMessage) {
        if(lastJsonMessage.miniTicker) setTickerState(lastJsonMessage.miniTicker);
      }
    },
    queryParams: {},
    onError: (error: Event) => console.log(error),
    shouldReconnect: (_closeEvent: CloseEvent) => true,
    reconnectInterval: 3000,
    reconnectAttempts: 20,
  })
  return {tickerState};
}

export default useDashboard;
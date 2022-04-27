import {useState} from 'react';
import useWebSocket from 'react-use-websocket';
import { useAuth } from '../../contexts/auth';
import { useBalances } from '../../contexts/balances';

const useDashboard = () => {
  const { updateBalances } = useBalances()
  const { data } = useAuth()
  const [tickerState, setTickerState] = useState({});
  const [bookState, setBookState] = useState({});
  const { lastJsonMessage } = useWebSocket(import.meta.env.VITE_APP_WS_URL, {
    onOpen: () => console.log('WebSocket connection opened'),
    onMessage: (_message: MessageEvent<any>) => {
      if(lastJsonMessage) {
        if(lastJsonMessage.miniTicker) setTickerState(lastJsonMessage.miniTicker);
        if(lastJsonMessage.book) setBookState(lastJsonMessage.book);
        if(lastJsonMessage.balance) updateBalances();
      }
    },
    queryParams: {"token": data.token},
    onError: (error: Event) => console.log(error),
    shouldReconnect: (_closeEvent: CloseEvent) => true,
    reconnectInterval: 3000,
    reconnectAttempts: 20,
  })
  return {tickerState, bookState};
}

export default useDashboard;
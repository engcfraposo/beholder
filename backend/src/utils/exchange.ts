import Binance from "node-binance-api";
const LOGS = process.env.BINANCE_LOGS === 'true';

const exchange = (settings: any) => {
  if(!settings){
    throw new Error('Settings not found');
  }

  const binance = new Binance({
    APIKEY: settings.accessKey,
    APISECRET: settings.secretKey,
    recvWindow: 60000,
    urls:{
      base: settings.apiUrl.endsWith("/")? settings.apiUrl : `${settings.apiUrl}/`,
      ws: settings.streamUrl.endsWith("/")? settings.streamUrl : `${settings.streamUrl}/`,
    },
    verbose: LOGS
  })

  const exchangeInfo = async () =>{
    return binance.exchangeInfo();
  }

  const miniTickerStream = async (callback: (markets: any) => void) => {
    binance.websockets.miniTicker(markets => callback(markets));
  }

  const bookStream = async (callback: (order: any) => void) => {
    binance.websockets.bookTickers((order: any) => callback(order));
  }

  const userDataStream = (
    balanceCallback: (balance: any) => void, 
    executionCallback: (order: any) => void,
    listStatusCallback: (order: any) => void,
    ) => {
      binance.websockets.userData(
        (balanceData: any) => balanceCallback(balanceData),
        (executionData: any) => executionCallback(executionData),
        (subscribeData: any) => console.log(`userDataStream:subscribed ${subscribeData}`),
        (listStatusData: any) => listStatusCallback(listStatusData),
      )
  }

  const balance = async () => {
    return binance.balance();
  }

  return {
    exchangeInfo,
    miniTickerStream,
    bookStream,
    userDataStream,
    balance
  }
}

export default exchange;
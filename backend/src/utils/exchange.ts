import Binance from "node-binance-api";

const exchange = (settings: any) => {
  if(!settings){
    throw new Error('Settings not found');
  }

  const binance = new Binance({
    APIKEY: settings.accessKey,
    APISECRET: settings.secretKey,
    urls:{
      base: settings.apiUrl.endsWith("/")? settings.apiUrl : `${settings.apiUrl}/`,
    }
  })

  const exchangeInfo = async () =>{
    return binance.exchangeInfo();
  }
  return {
    exchangeInfo,
  }
}

export default exchange;
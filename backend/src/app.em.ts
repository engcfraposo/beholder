import crypto from "./utils/crypto"
import exchange from "./utils/exchange"
import WebSocket from "ws"

export default (settings: any, wss: WebSocket.Server) => {
  if (!settings) {
    throw new Error("Settings not found");
  }
  if(!wss || !wss.clients) {
    throw new Error("WebSocket server not found");
  }

  settings.secretKey = crypto.decrypt(settings.secretKey);
  const { miniTickerStream, bookStream, userDataStream } = exchange(settings);

  function broadcast(jsonObject: { miniTicker?: any; book?: any[]; }) {
    if (!wss || !wss.clients) return;
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(jsonObject));
        }
    });
}

miniTickerStream(markets => {
    broadcast({ miniTicker: markets });
})

let book: any[]  = [];
bookStream(order => {
    if (book.length === 200) {
        broadcast({ book })
        book = [];
    } else book.push({...order});
})

userDataStream(
    //@ts-ignore
    (balanceData: any) => broadcast({ balance: balanceData }),
    //@ts-ignore
    (executionData: any) => broadcast({ execution: executionData }),
    //@ts-ignore
    (listStatusData: any) => broadcast({ listStatus: listStatusData }),
    
)


  console.log("🚀 Exchange Monitor server started");
}
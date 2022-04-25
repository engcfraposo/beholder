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
  const { miniTickerStream } = exchange(settings);

  miniTickerStream(markets => {
    wss.clients.forEach((client: WebSocket.WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({miniTicker:markets}));
      }
    });
  })

  console.log("🚀 Exchange Monitor server started");
}
import WebSocket from "ws"

const onMessage = (ws: WebSocket, message: string) => {
  console.log(`message: ${message}`);
}

const onError = (ws: WebSocket, error: Error) => {
  console.log(`error: ${error.message}`);
}

const onConnection = (ws: WebSocket, _req: any) => {
  ws.on("message", onMessage);
  ws.on("error", onError);
}

export default (server: any) => {
  const wss = new WebSocket.Server({ server });
  wss.on("connection", onConnection);
  console.log("🚀 WebSocket server started");
  return wss
}
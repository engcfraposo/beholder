import WebSocket from "ws"
import jwt from "jsonwebtoken"
import { IncomingMessage } from "http";

const onMessage = (_ws: WebSocket, message: string) => {
  console.log(`message: ${message}`);
}

const onError = (_ws: WebSocket, error: Error) => {
  console.log(`error: ${error.message}`);
}

const onConnection = (ws: WebSocket, _req: any) => {
  ws.on("message", onMessage);
  ws.on("error", onError);
}

const corsValidation = (origin:string) => {
  return process.env.CORS_ORIGIN?.startsWith(origin)
}


const verifyClient = (info: {origin: string, req: IncomingMessage}, callback: (res: boolean, status: number) => void) => {
  if (!corsValidation(info.origin)) {
    return callback(false, 401)
  }
  const token = info.req.url?.split("token=")[1]

  if(!token) {
    return callback(false, 401)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    if(!decoded) {
      return callback(false, 401)
    }

    return callback(true, 200)
  } catch (error) {
    return callback(false, 401)
  }
}

export default (server: any) => {
  const wss = new WebSocket.Server({ 
    server, 
    verifyClient
  });
  wss.on("connection", onConnection);
  console.log("🚀 WebSocket server started");
  return wss
}
import { WebSocketServer } from "ws";

let wss;

const initializeWebSocket = (server) => {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

const sendWebSocketNotification = (message) => {
  const wss = getWebSocketServer();
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
};

const getWebSocketServer = () => wss;

export { initializeWebSocket, getWebSocketServer, sendWebSocketNotification };

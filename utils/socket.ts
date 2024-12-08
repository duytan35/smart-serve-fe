let webSocket: WebSocket | null = null;

export const initializeWebSocket = (room: string) => {
  if (!webSocket) {
    webSocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/${room}`,
    );
  }
  return webSocket;
};

export const getSocket = () => {
  if (!webSocket) {
    throw new Error('Socket not initialized. Call initializeSocket first.');
  }
  return webSocket;
};

export const disconnectSocket = () => {
  if (webSocket) {
    webSocket.close();
    webSocket = null;
  }
};

import { io, Socket } from "socket.io-client";
import { refreshAccessToken } from "../../config/AxiosInstance";

let socket: Socket | null = null;
let isRefreshing = false;
export const connectSocket = (token: string) => {
  if (!token) return null;

  socket = io(import.meta.env.VITE_BASE_URL, {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket?.id);
  });

  socket.on("disconnect", () => {
    console.log(" Socket disconnected");
  });

  socket.on("connect_error", async (err) => {
    console.error("Reason:", err.message);
    if (err.message === "jwt expired" || err.message == 'socket authentication failed') {
      console.log("Detected expired token, refreshing...");
         if (isRefreshing) return;
      isRefreshing = true;
      try {
        const newAccessToken = await refreshAccessToken();
        const newToken = newAccessToken;

        if (socket) {
          socket.auth = { token: String( newToken )};
          socket.connect();
        }
      } catch (error) {
        console.error("Refresh failed, logging out");
      }finally{
         isRefreshing = false;
      }
    }
  });
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};

import { getSocket } from "./Socket";
import Store from "../../Redux/Store";
import {
  addNotification,
  type INotification,
} from "../../Redux/notificationSlice";
import { setIncomingCall, clearIncomingCall } from "../../Redux/vediCallNotifySlice";

export const registerSocketEvents = () => {
  const socket = getSocket();
  if (!socket) return;

  /**
   *  Notification
   */

  socket.on("notification-booking:new", (data: INotification) => {
    console.log("Notification [New] Received:", data);
    Store.dispatch(addNotification(data));
  });

  socket.on("notification-booking:success", (data: INotification) => {
    console.log("Notification [Success] Received:", data);
    Store.dispatch(addNotification(data));
  });

  socket.on("contract-notification", (data: INotification) => {
    Store.dispatch(addNotification(data));
  });

  /**
   * Video Call
   */
  socket.on("incomming-vedio-call", (data: { contractName: string; roomId: string }) => {
    console.log("Incoming video call received (Global):", data);
    Store.dispatch(setIncomingCall(data));
  });

  socket.on("call-ended", () => {
    console.log("Call ended (Global)");
    Store.dispatch(clearIncomingCall());
  });

};

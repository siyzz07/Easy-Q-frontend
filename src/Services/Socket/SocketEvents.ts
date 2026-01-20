import { NotificationToast } from "../../components/Shared/NotificationToast";
import { getSocket } from "./Socket";
import Store from "../../Redux/Store";
// import { addNotification } from "../../Redux/notificationSlice";

export interface INotificationPayload {
  title: string;
  message: string;
  type: string;
  createdAt: Date;
}

export const registerSocketEvents = () => {
  const socket = getSocket();
  if (!socket) return;

  /**
   *  Notification
   */


  socket.on("notification-booking:new", (data: INotificationPayload) => {
    console.log("Notification [New] Received:", data);
    NotificationToast(data.title, data.message);
    
    // Store.dispatch(addNotification({
    //   title: data.title,
    //   message: data.message,
    //   type: "info",
    //   createdAt: new Date(data.createdAt).toISOString()
    // }));
  });


  socket.on("notification-booking:success", (data: INotificationPayload) => {
    console.log("Notification [Success] Received:", data);
    NotificationToast(data.title, data.message, "success");
    
    // Store.dispatch(addNotification({
    //   title: data.title,
    //   message: data.message,
    //   type: "success",
    //   createdAt: new Date(data.createdAt).toISOString()
    // }));
  });
};

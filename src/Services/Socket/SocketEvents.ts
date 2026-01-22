import { NotificationToast } from "../../components/Shared/NotificationToast";
import { getSocket } from "./Socket";
import Store from "../../Redux/Store";
import { addNotification, type INotification } from "../../Redux/notificationSlice";
// import { addNotification } from "../../Redux/notificationSlice";



export const registerSocketEvents = () => {
  const socket = getSocket();
  if (!socket) return;

  /**
   *  Notification
   */


  socket.on("notification-booking:new", (data: INotification) => {
    console.log("Notification [New] Received:", data);
    // NotificationToast(data.title, data.content);
    
    Store.dispatch(addNotification(data));
  });


  socket.on("notification-booking:success", (data: INotification) => {
    console.log("Notification [Success] Received:", data);
    // NotificationToast(data.title, data.content, "success");
    
    Store.dispatch(addNotification(data));
  });
};

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
    Store.dispatch(addNotification(data));
  });


  socket.on("notification-booking:success", (data: INotification) => {
    console.log("Notification [Success] Received:", data);
    Store.dispatch(addNotification(data));
  });

  socket.on('contract-notification',(data:INotification)=>{
    Store.dispatch(addNotification(data))
  })
};

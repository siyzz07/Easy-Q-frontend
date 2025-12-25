import { NotificationToast } from "../../components/Shared/NotificationToast";
import { getSocket } from "./Socket";
// import { store } from "../../Redux/store";
// import { addMessage } from "../../Redux/chatSlice";
// import { addNotification } from "../../Redux/notificationSlice";


export interface INotificationPayload {
  title: string;
  message: string;
  type:string
  createdAt: Date;
}



export const registerSocketEvents = () => {
  const socket = getSocket();
  if (!socket) return;

  // // Chat messages
  // socket.on("chat:receive", (msg) => {
  //   // store.dispatch(addMessage(msg)); 
  // });

  // // Notifications
  // socket.on("notify:new", (notif) => {
  //   // store.dispatch(addNotification(notif));
  // });



  /**
   * 
   * 
   *  Notification
   * 
   */

  socket.on('notification-booking:new',(data:INotificationPayload)=>{
    console.log('here')
      NotificationToast(data.title ,data.message)
  })

  socket.on('notification-booking:success',(data:INotificationPayload)=>{
    
    NotificationToast(data.title,data.message,'success')
  })
};

import PusherServer from 'pusher';
import PusherCLient from 'pusher-js';

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "mt1", //"mt1"
  useTLS: true,
});


export const pusherCLient = new PusherCLient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  channelAuthorization : {
    endpoint : "/api/pusher/auth",
    transport : 'ajax'
  } ,
  cluster: "mt1",
});
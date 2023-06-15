// import io, { Socket } from 'socket.io-client';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// let socket: Socket | null = null;
let stompClient: Stomp.Client | null = null;

export const initSocket = (onMessage: (message: any) => void) => {
  if (stompClient) {
    return;
  }

  const socket = new SockJS('http://localhost:8080/ws');
  console.log('socket', socket);

  stompClient = Stomp.over(socket);

  const onError = (err: any) => {
    console.log('WebSocket error:', err);
  };

  const onConnected = () => {
    console.log('Connected to WebSocket');
    stompClient?.subscribe('/topic/notifications', (message) => {
      console.log('Received notification:', message);
      onMessage(JSON.parse(message.body));
    });
  };

  stompClient.connect({}, onConnected, onError);
}

export const closeSocket = () => {
  if (stompClient) {
    stompClient.disconnect(() => {
      console.log('Disconnected from WebSocket server');
    });
    
    stompClient = null;
  }
};

//   console.log("init socket is called");
//   if (socket) {
//     return;
//   }

//   console.log('connecting server through websocket......')
//   socket = io(process.env.SERVER_BASE_URL + "/ws");
//   console.log('connected');
//   console.log('socket', socket.active);
//   console.log(socket);

//   socket.on('notifications', (data: any) => {
//     console.log('data ===========', data);
//     onMessage(data);
//   });
// };

// export const closeSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };

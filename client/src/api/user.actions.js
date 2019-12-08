import io from 'socket.io-client';
import { environment, configure_socket } from './config/api.config'

let socket;

export const connectToChatServer = (params, calbackResponder, onConnected) =>{
  socket = io(environment.server_address);
  configure_socket(socket,calbackResponder);
};


export const sendMessage = (params, onMessageSent) => {
  socket.emit('send message', params);
  onMessageSent();
}
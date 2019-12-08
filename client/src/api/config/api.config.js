export const environment = {
  'server_address': 'http://localhost:8080',
};

export const configure_socket = (socket, callbackResponder) => {

  socket.on('connect', (packet) => {  	
  	callbackResponder({ 
  	  handshakeSucceeded: true
  	});
  });

  socket.on('connect_error', () => {    	
  	callbackResponder({ errors: true });
  });

  socket.on('user_connected_greeting', (packet) => {  
  	callbackResponder({ 
  		serverGreetingMessage: packet.serverGreetingMessage,
  		chatMessages: packet.messages
  	});
  });

  socket.on('broadcast', (packet) => {  
  	callbackResponder({ chatMessages: packet.messages });
  });
  
  return true;
}

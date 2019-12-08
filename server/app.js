const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const allMessages = [];

server.listen(80, '127.0.0.1', () => {
  console.log('Server started, listening on 127.0.0.1:80 ... '); 
});

io.on('connection', (socket) => {
  socket.emit('user_connected_greeting',{
  	messages: allMessages
  });

  socket.on('send message', (socket) => { 
    console.log(`user ${socket.person.username} sent a message`);
    const date = new Date();

    allMessages.push({
     username: socket.person.username,
     message: socket.message,
     timestamp: date.toLocaleTimeString('en-US'),
     profile:{
      id: socket.person.id,
      avatar: socket.person.avatar,
     }
    });

    io.sockets.emit('broadcast',{ messages: allMessages });
  });
});


app.set('socketIO', io);


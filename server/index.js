const UserMap = require('./users/users-map');
const {normalizePort} = require('./common/common');

let express = require('express');
let http =  require('http');
let app = express();
let onlineUsers = new UserMap();

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
});

let port = normalizePort(process.env.port || 3000);
app.set('port', port);
let server = http.createServer(app);
let io = require('socket.io').listen(server);


io.on('connection', (socket) => {
  socket.on('message', (message) => {
    message['from'] = onlineUsers.get(socket.id);
    if (message.hasOwnProperty('to')) {
      if (onlineUsers.has(message.to.id)) {
        io.to(message.to.id).emit("message", message);
      }
    } else {
      io.emit('message', message);
    }
  });
  socket.on('disconnect', function(){
    io.emit('disconnect', onlineUsers.get(socket.id));
    onlineUsers.delete(socket.id);

  });
  socket.on('login', (user) => {
    onlineUsers.set(socket.id, {name: user, id: socket.id});
    onlineUsers[socket.id] = user;
    io.to(`${socket.id}`).emit('message', {from: {id: undefined, name: 'Chat Bot'}, text: `Hi ${user}, Welcome to the chat app`});

    onlineUsers.forEach((u) => {
      io.to(`${u.id}`).emit('login', onlineUsers.get(socket.id));
      if (u.id !== socket.id) {
        io.to(`${socket.id}`).emit('login', onlineUsers.get(u.id));
      }
    });
  });

});
server.listen(port);
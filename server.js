const fs = require('fs');
const path = require('path');
const io = require('socket.io')(3000);

const users = {};
const filePath = path.join(__dirname, 'users.txt');

function isValidUser(name) {
  const data = fs.readFileSync(filePath, 'utf8');
  const names = data.split('\n').map(n => n.trim());
  return names.includes(name);
}

io.on('connection', socket => {
  socket.on('new-user', name => {
    if (!isValidUser(name)) {
      socket.emit('invalid-user');
      return;
    }
    users[socket.id] = name;
    socket.emit('valid-user');
    socket.broadcast.emit('user-connected', name);
  });

  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});

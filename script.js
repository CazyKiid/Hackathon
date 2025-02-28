const socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');

socket.emit('new-user', name);

socket.on('invalid-user', () => {
  alert('Invalid user! Please contact support or try again.');
  location.reload(); // Restart the prompt if the name is invalid
});

socket.on('valid-user', () => {
  appendMessage('You joined');

  socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
  });

  socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
  });

  socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
  });

  messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
  });
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

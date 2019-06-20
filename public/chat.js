// make connection
const socket = io.connect(['http://localhost:8000', 'http://66f04576.ngrok.io', 'https://66f04576.ngrok.io']);

// query the dom
const output = document.getElementById('output');
const handle = document.getElementById('handle');
const message = document.getElementById('message');
const form  = document.getElementById('form');
const feedback  = document.getElementById('feedback');

//  emit event
form.addEventListener('submit', e => {
  e.preventDefault();
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
})

// listen for events
socket.on('chat', (data) => {
  output.innerHTML += '<p id="output"><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  feedback.innerHTML = '';
})

socket.on('typing', (data) => {
  feedback.innerHTML = '<p id="typing"><em>' + data + ' is typing a message...</em></p>';
})
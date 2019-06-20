// make connection
const socket = io.connect(['http://localhost:8000', 'http://66f04576.ngrok.io', 'https://66f04576.ngrok.io']);

// query the dom
const output = document.getElementById('output');
const handle = document.getElementById('handle');
const message = document.getElementById('message');
const send  = document.getElementById('send');
const feedback  = document.getElementById('feedback');

//  emit event
send.addEventListener('click', () => {
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
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  feedback.innerHTML = '';
})

socket.on('typing', (data) => {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
})
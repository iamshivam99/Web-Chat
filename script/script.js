const socket = io('http://localhost:8000');

const form = document.getElementById('message-form');
const messageInput = document.getElementById('new-message');
const messageContainer = document.querySelector(".container");
var audio = new Audio('/resources/just-saying-593.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('msg-box');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'msg-left'){
        audio.play();
    }

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'msg-right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'msg-left');
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'msg-left');
})

socket.on('left', name => {
    append(`${name} left the chat`, 'msg-left');
})
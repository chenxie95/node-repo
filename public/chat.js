// Make Connection
// var hostname = window.location.hostname
// var socket = io.connect(`${hostname}:4000`);
var socket = io();

// Query DOM
var message = document.getElementById('message'),
    handle  = document.getElementById('handle'),
    btn     = document.getElementById('send'),
    output  = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    mario_chat = document.getElementById('mario-chat'),
    chat_window = document.getElementById('chat-window');




// Emit events
var name = handle.value

btn.addEventListener('click', function() {
    if (message.value !== '') {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        })
    }
    // clean the text after send
    message.value = '';
});

message.addEventListener('keyup', function(event) {
    if (event.key === "Enter" && message.value !== "")
    {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        })
        // clean the text after send
        message.value = '';
    }
});

socket.on('chat', function(data){
    feedback.innerHTML = ''
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
    chat_window.scrollTop = chat_window.scrollHeight;
});


message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a meesage...</em></p>'
});



socket.on('disconnet', function(data) {
    output.innerHTML += '<p><strong>' + name + ' ' + data + '</strong></p>'
});

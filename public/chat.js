// Make Connection
// var hostname = window.location.hostname
// var socket = io.connect(`${hostname}:4000`);
var socket = io();

// Query DOM
var message = document.getElementById('message'),
    handle  = document.getElementById('handle'),
    btn     = document.getElementById('send'),
    output  = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit events
var name = handle.value

btn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
    // clean the text after send
    message.value = '';
});



socket.on('chat', function(data){
    feedback.innerHTML = ''
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>'
});


message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a meesage...</em></p>'
});


message.addEventListener('keyup', function(event) {
    if (event.key === "Enter")
    {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        })
        // clean the text after send
        message.value = '';
    }
});


socket.on('disconnet', function(data) {
    output.innerHTML += '<p><strong>' + name + ' ' + data + '</strong></p>'
});

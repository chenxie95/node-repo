var express = require('express');
var socket = require('socket.io');

var PORT = process.env.PORT || 4000

// App setup
var app = express();
var server = app.listen(PORT, function() {
    var addr = app.address();
    console.log('listening to requests on port: ' + PORT + " on " + addr)
});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    });

});


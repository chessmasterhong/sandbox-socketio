'use strict';

var express  = require('express'),
    app      = express(),
    http     = require('http').Server(app),
    io       = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
    console.log('User has joined the chat.');
    io.emit('User has joined the chat.');

    socket.on('disconnect', function() {
        console.log('User has left the chat.');
        io.emit('User has left the chat.');
    });

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});

var server = http.listen(8080, '127.0.0.1', function() {
    console.log('Server started on ' + server.address().address + ':' + server.address().port);
});

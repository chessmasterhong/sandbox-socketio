'use strict';

var socket = io();

document.getElementById('inputForm').addEventListener('submit', function() {
    socket.emit('chat message', document.getElementById('msg').value);
    document.getElementById('msg').value = '';
}, false);

socket.on('chat message', function(msg) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(msg));
    document.getElementById('messages').appendChild(li);
});

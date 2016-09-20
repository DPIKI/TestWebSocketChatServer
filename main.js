#!/usr/bin/env node

/**
 * Main application file
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, { transports : ['websocket']});
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('connected');
    socket.on('message', function (msg) {
        console.log(msg);
        socket.send(msg);
    });

    socket.on('disconnect', function () {
        console.log('disconnect');
    });

    socket.on('error', function() {
        console.log('error');
    });

    socket.on('send_new_message', function (msg) {
        console.log('On send_new_message : ' + msg);
        var jsonMsg = JSON.parse(msg);
        var currDate = new Date();
        jsonMsg.time = currDate.getHours().toString() + ":" + currDate.getMinutes().toString();
        socket.emit('new_message', JSON.stringify(jsonMsg));
    })
});

http.listen(process.env.PORT || 3000);

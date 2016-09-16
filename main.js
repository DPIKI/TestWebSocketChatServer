#!/usr/bin/env node

/**
 * Main application file
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('connected');
    socket.on('message', function (msg) {
        console.log(msg);
    })
});

http.listen(3000);

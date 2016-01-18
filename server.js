var PORT= process.env.PORT || 3000;
var express = require('express');

var moment = require('moment');
var now = moment();

var app = express();
var http = require('http').Server(app);
var io =require('socket.io')(http);


app.use(express.static(__dirname + '/public'));
io.on('connection',function (socket){
	console.log('user connected via io');
	
	socket.on('message',function (message){
		message.timeStamp = moment().valueOf();
		console.log('Message recieved: '+ message.text);
		io.emit('message',message);
	});

	socket.emit('message',{
		name: 'System',
		timeStamp:moment().valueOf(),
		text: 'Welcome to EE-chat application'
	});

});

http.listen(PORT,function(){
	console.log ('Server is up');
});


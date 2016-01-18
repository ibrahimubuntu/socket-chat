var PORT= process.env.PORT || 3000;
var express = require('express');

var moment = require('moment');
var now = moment();

var app = express();
var http = require('http').Server(app);
var io =require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

var clientInfo = {

};

io.on('connection',function (socket){
	console.log('user connected via io');
	
	socket.on('disconnect',function (){
		var userData = clientInfo[socket.id];
		if (typeof userData !== 'undefined')
		{
			socket.leave(userData.room);
			io.to(userData.room).emit('message',{
				name: 'System',
				text: userData.name + ' has left the room !!',
				timeStamp: moment().valueOf()
			});

		delete clientInfo[socket.id];	
		}
	});


	socket.on('joinRoom', function (req) {
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',{
			name: 'System',
			text: req.name + ' has joined !!',
			timeStamp: moment().valueOf()
		});
	});


	socket.on('message',function (message){
		message.timeStamp = moment().valueOf();
		console.log('Message recieved: '+ message.text);
		io.to(clientInfo[socket.id].room).emit('message',message);
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


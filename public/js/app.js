var socket = io();

socket.on('connect',function(){
	console.log('Successfully connect to server');
})
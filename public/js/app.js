var socket = io();

socket.on('connect',function(){
	console.log('Successfully connect to server');
});

socket.on('message',function (message){
	console.log ('new message');
	console.log(message.text);

	jQuery('.messages').append('<p>'+ message.text +'</p>');
});


// get messages from form
var $form = jQuery('#messageForm');



$form.on('submit',function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message',{
		text: $message.val()
	});

	$message.val('');

});
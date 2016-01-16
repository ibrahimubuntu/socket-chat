var socket = io();

socket.on('connect',function(){
	console.log('Successfully connect to server');
});

socket.on('message',function (message){
	console.log ('new message');
	var timeMoment = moment.utc(message.timeStamp);
	console.log(timeMoment.local().format('MMM Do YYYY, h:mm a'));
	console.log(message.text);
	jQuery('.messages').append('<p>' + '<strong style = "color:blue;">' +timeMoment.local().format('h:mm a')+': </strong>'+' '+message.text   +'</p>');
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
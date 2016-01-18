var name = getQueryVariable('name') || 'Annonymous';
var room = getQueryVariable('room');
var socket = io();

jQuery('.room-title').text(room);

socket.on('connect',function(){
	console.log('Successfully connect to server');
	socket.emit('joinRoom',{
		name: name,
		room: room
	});
});

socket.on('message',function (message){
	console.log ('new message');
	var timeMoment = moment.utc(message.timeStamp);
	var $message = jQuery('.messages');
	console.log(timeMoment.local().format('MMM Do YYYY, h:mm a'));
	console.log(message.text);
	
	$message.append('<p><strong style = "color:red;">'+ message.name +' </strong></p>')
	$message.append('<p>' + '<strong style = "color:blue;">' +timeMoment.local().format('h:mm a')+': </strong>'+' '+message.text   +'</p>');
});


// get messages from form
var $form = jQuery('#messageForm');
$form.on('submit',function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message',{
		name: name,
		text: $message.val()
	});

	$message.val('');

});
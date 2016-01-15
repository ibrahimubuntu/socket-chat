 var moment = require ('moment');
 var now = moment();

//console.log(now.valueOf());
//console.log(now.format('MMM Do YYYY, h:mma'));
var timestamp = 1452899841290;
var timeMoment = moment.utc(timestamp);
console.log(timeMoment.local().format('MMM Do YYYY, h:mm a'));
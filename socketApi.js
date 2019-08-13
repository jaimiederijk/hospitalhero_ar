var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

var clients = [];

io.on('connection', function(socket){
  socket.username = "Anonymous";
  socket.join('playersroom');
  clients.push({id : socket.id,rooms : socket.rooms, name: socket.username});

  adminSpace.emit('adminupdateuserlist',clients)
  console.log('A user connected');
  io.emit('news',"heelo");
  socket.username = "Anonymous";


  socket.on('pointchange',(data)=>{
    io.emit('adminupdatepoints',data);
    console.log(data);
  })
  socket.on('disconnect', ()=>{
    clients.splice(clients.indexOf(socket), 1)
  })
});

const adminSpace = io.of('/admin');
adminSpace.on('connection', ()=>{
  console.log('someone connected to admin');
  adminSpace.emit('news',"heelo admin");
})


socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socketApi;

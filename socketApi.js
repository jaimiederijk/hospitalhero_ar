var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

var connector  = require('./lib/connector');

socketApi.io = io;

var clientsFocus = [];



io.on('connection', function(socket){
  socket.username = "Anonymous";
  socket.join('playersroom');


  //adminSpace.emit('adminupdateuserlist',clients)
  console.log('A user connected');
  io.emit('news',"heelo");
  socket.username = "Anonymous";

  socket.on('loginToAdmin',(info)=>{
    console.log("loginToAdmin");
    console.log(info);

    connector.dbactions.findUser(info.id, (data)=>{

      clientsFocus.push({socketid : socket.id,rooms : socket.rooms, data:data, points:0, gametype:info.gametype });
      adminSpace.emit('adminupdateuserlist',clientsFocus);
    })
  })

  socket.on('pointchange',(data)=>{
    console.log("pointsChange");
    console.log(data);
    // io.emit('adminupdatepoints',data);
    // modify clients with new points
    var userInClientsIndex = clientsFocus.findIndex(function(user){ return user.data._id == data.id; });
    console.log(userInClientsIndex);
    //no result
    if (userInClientsIndex == -1) {
      console.log("not in client yet");
      connector.dbactions.findUser(data.id, (userdata)=>{

        clientsFocus.push({socketid : socket.id,rooms : socket.rooms, data:userdata, points:data.data.newPoints, gametype:data.gametype });
        adminSpace.emit('adminupdateuserlist',clientsFocus);
      })
    } else {
      clientsFocus[userInClientsIndex].points = data.data.newPoints;
      console.log(clientsFocus);
    }

    adminSpace.emit('adminupdateuserlist',clientsFocus);

  })
  socket.on('disconnect', ()=>{
    clientsFocus.splice(clientsFocus.indexOf(socket), 1)
    adminSpace.emit('adminupdateuserlist',clientsFocus);
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

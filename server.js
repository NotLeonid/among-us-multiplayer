var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var port=3000;
app.get('/',function(req,res){res.sendFile(__dirname + '/index.html');});
app.get('*',function(req,res){res.sendFile(__dirname + req.originalUrl);});
io.on('connection',socket =>{
setInterval(function(){
socket.broadcast.emit('ping-reply',{start:new Date().getTime()});
},1000);
//socket.on('get-ping',data=>{socket.broadcast.emit('ping-reply',data);});
socket.on('send-red-position',data=>{socket.broadcast.emit('red-position',data);});
socket.on('send-blue-position',data=>{socket.broadcast.emit('blue-position',data);});
socket.on('send-green-position',data=>{socket.broadcast.emit('green-position',data);});
socket.on('send-yellow-position',data=>{socket.broadcast.emit('yellow-position',data);});
});
http.listen(port,function(){console.log(`Among Us multiplayer server started on port ${port}`);});

console.log("------------------------");console.log(http);console.log("------------------------");console.log(app);console.log("------------------------");console.log(io);console.log("------------------------");
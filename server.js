"use strict";
var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);
const nodemailer=require("nodemailer");
const fs=require("fs");
require("dotenv").config();
async function main(){
let transporter=nodemailer.createTransport({
host:"smtp.mail.com",
auth:{user:process.env.user,pass:process.env.pass,},
});
let info=await transporter.sendMail({
from:'"Notifier 🔔" <'+process.env.user+'>',
to:fs.readFileSync("./recipients.txt").toString(),
subject:"Server started",
html:"<center><h1>Server started</h1><p>Your server have been started at "+new Date().toUTCString()+".</p></center>"
});
console.log(`Sent a notification to ${recipients}`);
}
var port=process.env.port||80;
app.get('/',function(req,res){res.sendFile(__dirname + '/index.html');});
app.get('*',function(req,res){if(!req.originalUrl.includes("?")){res.sendFile(__dirname + req.originalUrl);}});
const users = {};
io.on('connection',socket=>{
console.log(`JOIN > ${socket.id} joined (connected)`);
setInterval(function(){
var a=new Date().getUTCMilliseconds()+(new Date().getUTCSeconds()*1000)+(new Date().getUTCMinutes()*60000);
socket.broadcast.emit('ping-reply',{start:a});
},1000);
//socket.on('get-ping',data=>{socket.broadcast.emit('ping-reply',data);});
socket.on('send-red-position',data=>{socket.broadcast.emit('red-position',data);});
socket.on('send-blue-position',data=>{socket.broadcast.emit('blue-position',data);});
socket.on('send-green-position',data=>{socket.broadcast.emit('green-position',data);});
socket.on('send-yellow-position',data=>{socket.broadcast.emit('yellow-position',data);});
socket.on('disconnect',()=>{console.log(`LEAV > ${socket.id} left (disconnected)`);socket.broadcast.emit('user-disconnected',users[socket.id]);delete users[socket.id];});
socket.on('new-user',name=>{users[socket.id]=`${name} (${socket.id})`;socket.broadcast.emit('user-connected',name+` (${socket.id})`);});
socket.on('send-chat-message',message=>{console.log(`MSSG > ${socket.id}: ${message}`);socket.broadcast.emit('chat-message',{message:message,name:users[socket.id]});});
});
http.listen(port,function(){console.log(`Among Us multiplayer server started on port ${port}`);main().catch(console.error);});
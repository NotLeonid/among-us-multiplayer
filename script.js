const socket=io("http://amongusmultiplayer.glitch.me");
socket.on('red-position',pos=>{console.log(`%cRed ~ X: ${pos.x} Y: ${pos.y}`,"color:red;");red.x=pos.x;red.y=pos.y;});
socket.on('blue-position',pos=>{console.log(`%cBlue ~ X: ${pos.x} Y: ${pos.y}`,"color:blue;");blue.x=pos.x;blue.y=pos.y;});
socket.on('green-position',pos=>{console.log(`%cGreen ~ X: ${pos.x} Y: ${pos.y}`,"color:green;");green.x=pos.x;green.y=pos.y;});
socket.on('yellow-position',pos=>{console.log(`%cYellow ~ X: ${pos.x} Y: ${pos.y}`,"color:yellow;");yellow.x=pos.x;yellow.y=pos.y;});
function sound(src){
this.sound=document.createElement("audio");
this.sound.src=src;
this.sound.setAttribute("preload","auto");
this.sound.setAttribute("controls","none");
this.sound.style.display="none";
document.body.appendChild(this.sound);
this.play=function(){this.sound.play();}
this.stop=function(){this.sound.pause();}
}
socket.on('ping-reply',data=>{
var a=new Date().getUTCMilliseconds()+(new Date().getUTCSeconds()*1000)+(new Date().getUTCMinutes()*60000);
var ping=a-data.start;
if(ping<0){var ping=ping*-1;}
if(ping>=0&&ping<=500){
document.getElementById("stat").innerHTML=`<good>Ping: ${ping}ms</good>`;
}else if(ping>500&&ping<1000){
document.getElementById("stat").innerHTML=`<warn>Ping: ${ping}ms</warn>`;
}else if(ping>=1000){document.getElementById("stat").innerHTML=`<err>Ping: ${ping}ms</err>`;
}else{
document.getElementById("stat").innerHTML=`<err>Connection error</err>`;
}
});
appendMessage('You joined (connected)');
socket.on('chat-message',data=>{
  appendMessage(`${data.name}:\r\n ${data.message}`);
  new sound("./msg.mp3").play();
});
socket.on('user-connected',name=>{
appendMessage(`${name} joined (connected)`);
  new sound("./join.mp3").play();
});
socket.on('user-disconnected',name=>{
appendMessage(`${name} left (disconnected)`);
  new sound("./leave.mp3").play();
});
document.getElementById("message-form").addEventListener('submit',e=>{
if(document.getElementById("message-input").value!=""){
e.preventDefault();
const message=document.getElementById("message-input").value;
appendMessage(`You: ${message}`);
socket.emit('send-chat-message',message);
document.getElementById("message-input").value='';
}
});
function appendMessage(message) {
var msg=document.createElement('div');
msg.innerText=message;
document.getElementById("messages").innerHTML=msg.innerHTML+"<hr>"+document.getElementById("messages").innerHTML;
}
const socket=io("host:3000");
socket.on('red-position',pos=>{console.log(`%cRed ~ X: ${pos.x} Y: ${pos.y}`,"color:red;");red.x=pos.x;red.y=pos.y;});
socket.on('blue-position',pos=>{console.log(`%cBlue ~ X: ${pos.x} Y: ${pos.y}`,"color:blue;");blue.x=pos.x;blue.y=pos.y;});
socket.on('green-position',pos=>{console.log(`%cGreen ~ X: ${pos.x} Y: ${pos.y}`,"color:green;");green.x=pos.x;green.y=pos.y;});
socket.on('yellow-position',pos=>{console.log(`%cYellow ~ X: ${pos.x} Y: ${pos.y}`,"color:yellow;");yellow.x=pos.x;yellow.y=pos.y;});
socket.on('ping-reply',data=>{
//var h=setTimeout(";");
//clearTimeout(h-2);
var ping=new Date().getTime()-data.start;
if(ping<0){var ping=ping*-1;}
if(ping>=0&&ping<=500){document.getElementById("stat").innerHTML=`<good>Ping: ${ping}</good>`;}
else if(ping>600){document.getElementById("stat").innerHTML=`<warn>Ping: ${ping}</warn>`;}
else{document.getElementById("stat").innerHTML=`<err>Connection error</err>`;}
//var timeout=setTimeout(function(){document.getElementById("stat").innerHTML=`<err>Server disconnected</err>`;},3000);
});
const socket=io("https://among-us-multiplayer.herokuapp.com:3000");
socket.on('red-position',pos=>{console.log(`%cRed ~ X: ${pos.x} Y: ${pos.y}`,"color:red;");red.x=pos.x;red.y=pos.y;});
socket.on('blue-position',pos=>{console.log(`%cBlue ~ X: ${pos.x} Y: ${pos.y}`,"color:blue;");blue.x=pos.x;blue.y=pos.y;});
socket.on('green-position',pos=>{console.log(`%cGreen ~ X: ${pos.x} Y: ${pos.y}`,"color:green;");green.x=pos.x;green.y=pos.y;});
socket.on('yellow-position',pos=>{console.log(`%cYellow ~ X: ${pos.x} Y: ${pos.y}`,"color:yellow;");yellow.x=pos.x;yellow.y=pos.y;});
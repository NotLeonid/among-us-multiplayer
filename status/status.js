const socket=io("https://among-us-multiplayer.herokuapp.com");
document.getElementById("stat").innerHTML="<err>Server disconnected</err>";
socket.on('ping-reply',data=>{
var h=setTimeout(";");
for(i=0;i<h;i++){clearTimeout(i);}
var a=new Date().getUTCMilliseconds()+(new Date().getUTCSeconds()*1000)+(new Date().getUTCMinutes()*60000);
var ping=a-data.start;
if(ping<0){var ping=ping*-1;}
if(ping>=0&&ping<=500){
document.getElementById("stat").innerHTML=`<good>Ping: ${ping}ms</good>`;
var link=document.querySelector("link[rel*='icon']")||document.createElement('link');link.rel='icon';link.href='../green-r.png';document.getElementsByTagName('head')[0].appendChild(link);
}else if(ping>500&&ping<1000){
document.getElementById("stat").innerHTML=`<warn>Ping: ${ping}ms</warn>`;
var link=document.querySelector("link[rel*='icon']")||document.createElement('link');link.rel='icon';link.href='../yellow-r.png';document.getElementsByTagName('head')[0].appendChild(link);
}else if(ping>=1000){document.getElementById("stat").innerHTML=`<err>Ping: ${ping}ms</err>`;
}else{
document.getElementById("stat").innerHTML=`<err>Connection error</err>`;
var link=document.querySelector("link[rel*='icon']")||document.createElement('link');link.rel='icon';link.href='../red-r.png';document.getElementsByTagName('head')[0].appendChild(link);
}
var timeout=setTimeout(function(){document.getElementById("stat").innerHTML=`<err>Server disconnected</err>`;var link=document.querySelector("link[rel*='icon']")||document.createElement('link');link.rel='icon';link.href='../red-r.png';document.getElementsByTagName('head')[0].appendChild(link);},3000);
});
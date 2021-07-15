
// Create Socket
var message;
var temp;
var messages=[];
var json;
var flag=false;
var name = prompt('введите имя' )
const socket = new WebSocket('ws://localhost:8081');
// обработчик проинформирует в консоль когда соединение установится
socket.onopen = function () {
  console.log('connect Server');
};
// обработчик сообщений от сервера
socket.onmessage = function (messageFromServer) {

  console.log('Message: %s', messageFromServer.data)
    // console.log(messageFromServer);
  if (json == messageFromServer.data) {
    console.log('equal data');
    return
  } else {
    console.log('not equal');
    print(messageFromServer.data);
  }
};
// Обработчик ошибок
socket.onerror = function (error) {
  console.log('onerror: '+ error.message);
};
// функция для отправки echo-сообщений на сервер
function wsSendEcho(value) {
  socket.send(JSON.stringify({action: 'ECHO', data: value.toString()}));
}
// функция для отправки команды ping на сервер
function wsSendPing() {
  socket.send(JSON.stringify({action: 'PING'}));
}


var input=document.getElementById("input");
var button=document.getElementsByClassName("button")[0];
button.addEventListener('click',function(event){
event.preventDefault();
});
input.addEventListener("keypress",function(event){
 if(event.key=="Enter"){send();render();
 event.preventDefault()}}
);


function print(messageFromServer) {
messages.push(JSON.parse(messageFromServer));
flag = 1;
messages.forEach((item,i) => {
message=item.message;
temp=item.date+" "+"("+item.name+")";
});
    render();
    console.log(messages);
}

function send(){
  flag = 0;
date=new Date();
var time= " "+date.getHours()+" : "+date.getMinutes()+" ";
messages.push({'name':name,  'date': time, 'message': input.value});
console.log(messages);

// Send to Server
 messages.forEach((item,i) => {
  message=item.message;
  temp=item.date+" "+"("+item.name+")"});
  json = JSON.stringify({'name':name,  'date': time, 'message': input.value})
  socket.send(json);
  input.value="";
  //Обработчик прочтения сообщения клиентом

 };

render=()=>{
if (message!=""){

  var ul =document.createElement("ul");
  var li=document.createElement("li");
  var span = document.createElement("span");
  var span1 = document.createElement("span");
  span.innerText=message+"  ";
  span1.innerText=temp;
  var rotationMes = document.createElement("div");
  var tail = document.createElement("div");
  tail.classList.add("tail");
  rotationMes.appendChild(span);
  rotationMes.appendChild(span1);
  rotationMes.appendChild(tail);
  li.appendChild(rotationMes);
  span1.classList.add("dat");
    if (flag==0){
    rotationMes.classList.add("chat");
    window.addEventListener('focus', () => {console.log('focusON');
    rotationMes.classList.add("chat1");

    })
    tail.classList.add("tail1");
    li.classList.add ('li1')}
    else {
    rotationMes.classList.add("chat2");
    tail.classList.add("tail2");
    li.classList.add ('li2');
    }

  ul.appendChild(li);
  var div=document.getElementsByClassName("chat-msgs")[0];

  div.appendChild(ul);
  div.scrollBy(100,100);
}
};

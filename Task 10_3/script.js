/*
1)Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».ы
При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:

2) Добавить в чат механизм отправки гео-локации:
При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить. */
const wsUri = "wss://echo-ws-service.herokuapp.com"; 
const serverStatus = document.querySelector(".chat_serverStatus");
const inputMessage = document.querySelector(".chat_mainWindow_firstRow_input");
const btnRequest = document.querySelector(".chat_mainWindow_firstRow_btn");
const messagesDesk = document.querySelector(".chat_mainWindow_secondRow");
const btnRequestGeo = document.querySelector(".chat_mainWindow_firstRow_btnGeo");


document.addEventListener("DOMContentLoaded", ()=>{
    let socket = new WebSocket(wsUri);
    socket.onopen = function(evt) {
        serverStatus.textContent = "CONNECTED";
    };
    socket.onclose = function(evt) {
        serverStatus.textContent = "DISCONNECTED";
    };
    socket.onmessage = function(evt) {
        let newMessages = `<p class="chat_mainWindow_secondRow_message serverMessage">${inputMessage.value}</p>`
        messagesDesk.innerHTML += newMessages;
    };
    socket.onerror = function(evt) {
        serverStatus.textContent = "ERROR" + evt.data
   
    };
    btnRequest.addEventListener("click", ()=>{
        if (!inputMessage.value) return;
        socket.send(inputMessage.value);
        let newMessages = `<p class="chat_mainWindow_secondRow_message userMessage">${inputMessage.value}</p>`
            messagesDesk.innerHTML += newMessages;
    })
    btnRequestGeo.addEventListener("click", ()=>{
        let href = '';
        let message = '';
        const error = () => {
            console.log('Невозможно получить ваше местоположение');
        }
        const success = (position) => {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
  
            href = `https://www.openstreetmap.org/#map=16/${latitude}/${longitude}`;
            message = `<a href="${href}" style="text-decoration:none;" target="blank">Гео-локация</a>`;
            let newMessages = `<p class="chat_mainWindow_secondRow_message userMessage">${message}</p>`
            messagesDesk.innerHTML += newMessages;
        }
        navigator.geolocation.getCurrentPosition(success, error);
    })
  
})



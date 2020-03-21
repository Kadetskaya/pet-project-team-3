"use strict";

let input = document.getElementById('input');
let display = document.getElementById('display');
let person = document.getElementById('person');
let color = '';
let userName = '';

let socket = new WebSocket('wss://zi-node-chat.herokuapp.com');

function newMessage(dat, message, author, color) {
    display.innerHTML += '<p class="row"><span style="color:' + color + ' ">' + author + '</span> @ '
        + (dat.getHours() < 10 ? '0' + dat.getHours() : dat.getHours()) + ':' + (dat.getMinutes() < 10 ? '0'
            + dat.getMinutes() : dat.getMinutes()) + ' : ' + message + '</p>';
};

socket.onopen = function () {
    person.innerText = 'Choose nickname:';
};

socket.onerror = function () {
    display.innerText = 'ERROR';
    display.className = 'display error';
    input.setAttribute('disabled', '');
};

socket.onmessage = function (message) {
    let json = JSON.parse(message.data);

    if (json.type === 'history') {
        for (let i = 0; i < json.data.length; i++) {
            newMessage(new Date(json.data[i].time), json.data[i].text, json.data[i].author, json.data[i].color);
            display.scrollTop = display.scrollHeight;
        }
    }
    if (json.type === 'message') {
        newMessage(new Date(json.data.time), json.data.text, json.data.author, json.data.color);
        display.scrollTop = display.scrollHeight;
    }
    if (json.type === 'color') {
        color = json.data;
        person.style.color = color;
    }
};


input.addEventListener('keydown', function (e) {
    if (e.code === 'Enter') {
        let message = input.value;
        if (!message) {
            return;
        }
        if (!userName) {
            userName = message;
            person.innerText = message;
        }

        socket.send(message);
        input.value = '';
    }
});



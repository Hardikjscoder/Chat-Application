// Selectors
const messageContainer = document.querySelector('.message_container')
const input = document.getElementById('message_input')

// Initial variables and require io
let userName
const socket = io()

// Require the user's name
do {
    userName = prompt('Please enter your user name...')
} while (!userName)

// Listen the event on input
input.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        sendMessage(event.target.value)
    }
})

// *********** Functions *************

// Function to send message
function sendMessage(message) {
    let msg = {
        user: userName,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing')
    input.value = ''
    socket.emit('sendMessage', msg)
}

// Function to append the message in the DOM
function appendMessage(message, type) {
    const div = document.createElement('div')
    let class_name = type
    div.classList.add(class_name, 'message')

    let html = `
        <h4>${message.user}</h4>
        <p>${message.message}</p>
    `

    div.innerHTML = html
    messageContainer.appendChild(div)
}

socket.on('sendMessage', msg => {
    appendMessage(msg, 'incoming')
    scroll()
})

function scroll() {
    messageContainer.scrollTop = messageContainer.scrollHeight
}
var socket = io() // pode-se usar também desta maneira caso queira: io("http://localhost:{porta}/")

var form = document.getElementById('form')
    ,all_messages = document.getElementById('messages');

var message = document.getElementById('input-message')
    ,username = document.getElementById("username")
    ,online_users = document.getElementById("online-users")
    ,typing = document.getElementById('typing')


message.addEventListener('keyup', (event) => {
    var information = {
        user: username.value,
        event: 'typing'
    }

    if (username.value){
        socket.emit('info', information)
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const my_msg = {
        user : username.value,
        msg  : message.value
    }

    if (username.value && message.value) {
        socket.emit('chat', my_msg);
        message.value = ''
    }
})

socket.on('info', (info) => {
    const filterInfos = {
        svConnection(info) {
            var info_msg = document.createElement('li')

            online_users.textContent = `● ${info.users}`
            info.eventType == 'connected' ? info_msg.textContent = 'A user has connected on chat!' : info_msg.textContent = 'A user has disconnected!'
            
            info_msg.setAttribute('id', 'info');
            all_messages.appendChild(info_msg)
        },

        svAlert(info) {
            var alert_msg = document.createElement('li')
            alert_msg.setAttribute('id', 'info')

            alert_msg.textContent = 'ola'
            all_messages.appendChild(alert_msg)
            window.alert('Foi aqui no front')
        },

        typing(info) {
            if (info.user != username.value) {
                typing.textContent = `${info.user} is typing...`

                setTimeout(function() {
                    typing.textContent = ''
                }, 7000)
            }
        }
    }
    info_received = filterInfos[info.event]

    if (info_received) {
        info_received(info)
    }
})

socket.on('chat', (msg) => {
    var li = document.createElement('li');

    if (msg.user == username.value) {
        li.setAttribute('id', 'my-msg')
        li.textContent = msg.msg
    } else {
        li.setAttribute('id', 'message')
        li.textContent = `${msg.user}: ${msg.msg}`
    }

    all_messages.appendChild(li);
})


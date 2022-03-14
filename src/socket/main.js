module.exports = (io) => {
    var server_messages = [];
    var info_chat = {
        users : 0,
        event: null
    }

    io.on('connection', (socket) => {
        info_chat.users ++
        info_chat.event = 'svConnection', info_chat.eventType = 'connected'
        
        io.emit('info', info_chat)
        
        if (server_messages.length < 400) {
            for (let i = 0; i < server_messages.length; i++) {
                setTimeout(() => io.emit('chat', server_messages[i]), 3000);
            }
        } else server_messages = [];
        
        socket.on('disconnect', () => {
            info_chat.users --
            info_chat.event = 'svConnection', info_chat.eventType = 'disconnected'
            
            io.emit('info', info_chat)
        })

        socket.on('info', (info) => {
            io.emit('info', info)
        })

        socket.on('chat', (message) => {
            server_messages.push(message);
            io.emit('chat', message)
        })    
    })
}


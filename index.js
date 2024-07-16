const express = require('express');
const http = require('http');
const app = express();
const { Server } = require("socket.io");
const path = require('path');
require('dotenv').config()


const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket connection handler
io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
        socket.broadcast.emit('message', message);
    });
});

// Serve index.html for the root URL '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define the port to listen to
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

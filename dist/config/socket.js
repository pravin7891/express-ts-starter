"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupWebSocket;
const socket_io_1 = require("socket.io");
function setupWebSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
    return io;
}

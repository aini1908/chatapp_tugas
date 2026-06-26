const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Supaya server bisa membaca file HTML/CSS/JS dari folder 'public'
app.use(express.static('public'));

// Logika ketika ada perangkat (client) yang terhubung
io.on('connection', (socket) => {
    console.log('Seorang pengguna terhubung!');

    // Mendengarkan pesan yang dikirim oleh pengguna
    socket.on('kirimPesan', (data) => {
        // Teruskan pesan ke semua orang yang sedang terhubung secara real-time
        io.emit('terimaPesan', data);
    });

    socket.on('disconnect', () => {
        console.log('Pengguna terputus.');
    });
});

// Jalankan server di port 3000 dan buka akses untuk semua IP (0.0.0.0)
const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server berjalan! Akses lewat http://localhost:${PORT}`);
});
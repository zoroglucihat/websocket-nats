const WebSocket = require('ws');

// NATS WebSocket URL'si
const NATS_WS_URL = 'ws://nats.railway.internal:8080';

// WebSocket bağlantısı oluşturma
const ws = new WebSocket(NATS_WS_URL);

// Bağlantı açıldığında
ws.on('open', () => {
    console.log('WebSocket bağlantısı kuruldu.');

    // NATS sunucusuna bir mesaj gönder
    const subject = 'test.subject';
    const message = 'Merhaba, NATS WebSocket!';

    // NATS protokolü ile mesaj formatı
    const payload = `PUB ${subject} ${message.length}\r\n${message}\r\n`;

    ws.send(payload, (err) => {
        if (err) {
            console.error('Mesaj gönderilirken hata oluştu:', err.message);
        } else {
            console.log(`Mesaj gönderildi: ${message}`);
        }
    });
});

// Mesaj alındığında
ws.on('message', (data) => {
    console.log('NATS üzerinden gelen mesaj:', data.toString());
});

// Hata durumunda
ws.on('error', (error) => {
    console.error('WebSocket hata aldı:', error.message);
});

// Bağlantı kapandığında
ws.on('close', () => {
    console.log('WebSocket bağlantısı kapatıldı.');
});

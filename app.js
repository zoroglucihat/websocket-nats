const WebSocket = require('ws');

// NATS WebSocket URL'si
const NATS_WS_URL = 'ws://nats.railway.internal:8080';

// NATS WebSocket bağlantısını başlatan işlev
function connectToNATS() {
    console.log(`Bağlantı kurulmaya çalışılıyor: ${NATS_WS_URL}`);
    const ws = new WebSocket(NATS_WS_URL);

    // WebSocket bağlantısı açıldığında
    ws.on('open', () => {
        console.log('WebSocket bağlantısı kuruldu.');

        // NATS sunucusuna bir mesaj gönder
        const subject = 'test.subject';
        const message = 'Merhaba, NATS WebSocket!';
        const payload = `PUB ${subject} ${message.length}\r\n${message}\r\n`;

        ws.send(payload, (err) => {
            if (err) {
                console.error('Mesaj gönderilirken hata oluştu:', err.message);
            } else {
                console.log(`Mesaj gönderildi: ${message}`);
            }
        });
    });

    // WebSocket mesaj alındığında
    ws.on('message', (data) => {
        console.log('NATS üzerinden gelen mesaj:', data.toString());
    });

    // Hata oluştuğunda
    ws.on('error', (error) => {
        console.error('WebSocket hata aldı:', error.message);
    });

    // Bağlantı kapandığında
    ws.on('close', (code, reason) => {
        console.log(`WebSocket bağlantısı kapatıldı! Kod: ${code}, Sebep: ${reason || 'Bilinmiyor'}`);
        console.log('Bağlantı yeniden deneniyor...');
        setTimeout(connectToNATS, 5000); // 5 saniye sonra yeniden bağlanmayı dene
    });
}

// NATS WebSocket bağlantısını başlat
connectToNATS();

import logo from './logo.svg';
import React, { useEffect } from 'react';
import { connect, StringCodec } from 'nats.ws';

function App() {
  useEffect(() => {
    const connectToNats = async () => {
      try {
        // NATS sunucusuna bağlan
        const nc = await connect({ servers: "wss://roundhouse.proxy.rlwy.net:20839" }); // NATS WebSocket URL'ini buraya yazın
        console.log("Connected to NATS!");

        // String codec oluştur
        const sc = StringCodec();

        // 'test.subject' konusunu dinle
        const sub = nc.subscribe('test.subject');
        for await (const msg of sub) {
          console.log(`Received a message: ${sc.decode(msg.data)}`);
        }
      } catch (error) {
        console.error("Error connecting to NATS:", error);
      }
    };

    connectToNats();
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <h1>NATS WebSocket Test</h1>
          <p>Listening to NATS messages...</p>
        </header>
      </div>
  );
}

export default App;

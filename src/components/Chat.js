import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io();

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat em Tempo Real</h2>
      <div style={{ height: "200px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite sua mensagem" />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default Chat;

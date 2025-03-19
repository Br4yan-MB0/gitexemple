import { useEffect, useState, useRef } from "react";

const WebSocketClient = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recipient, setRecipient] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const ws = useRef(null);
  const WS_URL = "wss://xxxxxxx"; // Alterar para URL do WebSocket no Vercel ou Railway

  // Conectar ao servidor WebSocket
  const connectToServer = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("Conectado ao servidor WebSocket");
      setIsConnected(true);
      setStatusMessage("Conectado ao servidor");
      refreshUsers();
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "ASSIGN_USERNAME") {
        setUsername((prev) => prev || data.username);
      } else if (data.type === "USER_LIST") {
        atualizarListaUtilizadores(data.users);
      } else if (data.type === "MESSAGE") {
        const senderName = data.sender === username ? "Eu" : data.sender;
        const timestamp = new Date().toLocaleTimeString();
        setMessages((prev) => [
          ...prev,
          `${timestamp} - ${senderName}: ${data.message}`,
        ]);
      } else if (data.type === "STATUS") {
        setStatusMessage(data.message);
      }
    };

    ws.current.onclose = () => {
      console.log("Desconectado do servidor WebSocket");
      setIsConnected(false);
      setUsername("");
      setUsers([]);
      setStatusMessage("Desconectado do servidor. Tentando reconectar...");
      setTimeout(connectToServer, 3000);
    };

    ws.current.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
      setStatusMessage("Erro de conexão. Tentando novamente...");
    };
  };

  // Atualizar lista de usuários conectados
  const atualizarListaUtilizadores = (lista) => {
    const filteredUsers = lista.filter((user) => user !== username);
    setUsers(filteredUsers);
  };

  // Enviar mensagem
  const sendMessage = () => {
    if (input && recipient && ws.current.readyState === WebSocket.OPEN) {
      const messageData = {
        type: "MESSAGE",
        recipient,
        message: input,
      };
      ws.current.send(JSON.stringify(messageData));
      setInput("");
    }
  };

  // Atualizar lista de usuários manualmente
  const refreshUsers = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "REQUEST_USER_LIST" }));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    connectToServer();
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  return (
    <div>
      <h2>WebSocket Chat Privado</h2>
      <p>{statusMessage}</p>

      {!isConnected ? (
        <button onClick={connectToServer}>Conectar</button>
      ) : (
        <p><strong>Nome de usuário:</strong> {username}</p>
      )}

      {isConnected && (
        <>
          <h3>Mensagens:</h3>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>

          <h3>Usuários Online:</h3>
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          >
            <option value="">Selecione um destinatário</option>
            {users.length > 0 ? (
              users.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))
            ) : (
              <option disabled>Nenhum utilizador disponível</option>
            )}
          </select>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite uma mensagem"
            disabled={!recipient}
          />
          <button onClick={sendMessage} disabled={!recipient || !input}>
            Enviar
          </button>
        </>
      )}
    </div>
  );
};

export default WebSocketClient;

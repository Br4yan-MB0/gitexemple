import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Criando servidor Socket.IO...");
    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Usuário conectado:", socket.id);

      socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
      });

      socket.on("disconnect", () => {
        console.log("Usuário desconectado:", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}

const { createServer } = require("node:http");
const next = require("next")
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const users = {};

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on('register', (userId) => {
      users[userId] = socket;
      console.log(`User ${userId} registered with socket id: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      for (let userId in users) {
        if (users[userId] === socket) {
          delete users[userId];
          break;
        }
      }
    });

    socket.on('emit_NEW_TRIP', (data) => {
      const {userId, name} = data;
      if (users[userId]) {
        users[userId].emit('NEW_TRIP', name);
      }
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
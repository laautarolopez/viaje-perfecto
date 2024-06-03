const { createServer } = require("node:http");
const next = require("next")
const { Server } = require("socket.io");
const { createNotificationSocket, deleteNotificationSocket, getNotificationSocket } = require('./src/app/actions/sockets.js');

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on('register', async (userId) => {
      await createNotificationSocket(userId, socket.id);
      console.log(`User ${userId} registered with socket id: ${socket.id}`);
    });

    socket.on('disconnect', async () => {
      await deleteNotificationSocket(socket.id)
    });

    socket.on('emit_NEW_TRIP', async (data) => {
      const {user_id, name} = data;
      const socket_id = await getNotificationSocket(user_id);
      if(socket_id) {
        io.to(socket_id).emit('NEW_TRIP', {name})
      }
    });

    socket.on('emit_ACCEPT_TRIP', async (data) => {
      const {user_id, email, name} = data;
      const socket_id = await getNotificationSocket(user_id);
      if(socket_id) {
        io.to(socket_id).emit('ACCEPT_TRIP', {email, name})
      }
    });

    socket.on('emit_DECLINE_TRIP', async (data) => {
      const {user_id, email, name} = data;
      const socket_id = await getNotificationSocket(user_id);
      if(socket_id) {
        io.to(socket_id).emit('DECLINE_TRIP', {email, name})
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
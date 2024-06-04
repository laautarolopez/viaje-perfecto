'use server'
const io = require('socket.io-client')

const sendNotification = (event, data) => {
  const socket = io('http://localhost:3000')
  socket.emit(event, data)
}

module.exports = {
  sendNotification
}

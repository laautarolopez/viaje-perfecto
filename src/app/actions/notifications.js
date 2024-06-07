'use server'
const io = require('socket.io-client')
const { createNotification } = require('./notificationsQuerys')

const sendNotification = async (event, data) => {
  const {user_id, title, message} = data
  const socket = io('http://localhost:3000')
  socket.emit(event, data)
  await createNotification(user_id, title, message)
}

module.exports = {sendNotification}
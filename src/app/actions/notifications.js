'use server'
// const io = require('socket.io-client')
const { query } = require('../../app/lib/db')

const sendPushNotification = async (event, data) => {
  // const socket = io('http://localhost:3000')
  // socket.emit(event, data)
}

const createNotification = async ({ user_id, title, message }) => {
  try {
    await query(
      'INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3)',
      [user_id, title, message]
    )
  } catch (error) {
    console.log(error)
    return { message: 'Error al guardar la notificación' }
  }
}
module.exports = { sendPushNotification, createNotification }

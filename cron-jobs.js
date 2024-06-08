const cron = require('node-cron')
const {
  getUsersFromTripsThatStartInDays
} = require('./src/app/actions/sockets.js')
const {
  sendPushNotification,
  createNotification
} = require('./src/app/actions/notifications.js')

const scheduleTasks = () => {
  cron.schedule('* * * * *', async () => {
    const usersAndTrips = await getUsersFromTripsThatStartInDays(7) // cambiar la fecha, es de prueba para que se ejecute el ejemplo
    usersAndTrips.forEach(({ user_id, name }) => {
      const notification = {
        user_id,
        title: 'Faltan 7 días para tu viaje',
        message: `Prepara tus cosas que en falta poco para que comience ${name}`
      }
      sendPushNotification('emit_NEW_NOTIFICATION', notification)
      createNotification(notification)
    })
    console.log('Esta funcion corre cada 1 minuto y es para testear.')
  })
}

module.exports = scheduleTasks

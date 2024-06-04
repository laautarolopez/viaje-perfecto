// cron-jobs.js

const cron = require('node-cron')
const {
  getUsersFromTripsThatStartInDays
} = require('./src/app/actions/sockets.js')

const { sendNotification } = require('./src/app/actions/notifications.js')

const scheduleTasks = () => {
  // Ejemplo: Ejecutar una tarea cada minuto, configurarlo para que sea a un horario, esto es de ejemplo.
  cron.schedule('* * * * *', async () => {
    const usersAndTrips = await getUsersFromTripsThatStartInDays(11) // cambiar la fecha, es de prueba para que se ejecute el ejemplo
    usersAndTrips.forEach(({ user_id, name }) => {
      sendNotification('emit_SEVEN_DAYS_TO_TRAVEL', {
        user_id,
        tripName: name
      })
    })
    console.log('Esta funcion corre cada 1 minuto y es para testear.')
    // Aquí puedes agregar la lógica que deseas ejecutar periódicamente
  })

  // // Ejemplo: Ejecutar una tarea todos los días a la medianoche
  // cron.schedule('0 0 * * *', () => {
  //   console.log('Ejecutando tarea diaria a la medianoche')
  //   // Aquí puedes agregar la lógica que deseas ejecutar periódicamente
  // })
}

module.exports = scheduleTasks

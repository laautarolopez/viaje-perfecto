import cron from 'node-cron'
import { getUsersFromTripsThatStartInDays } from '/home/lautaro-ubuntu/Documentos/UNQ/viaje-perfecto/src/app/actions/subscriptions'
import { sendNotification } from '../app/actions/notifications'

export const job =
  cron.schedule('* * * * *', async () => {
    const date = new Date()
    console.log(`-- Running cron job at ${date} --`)
    const dias = 6
    const usersAndTrips = await getUsersFromTripsThatStartInDays(dias) // cambiar la fecha, es de prueba para que se ejecute el ejemplo
    usersAndTrips.forEach(async ({ user_id, name }: { user_id: string, name: string }) => {
      const notification = {
        user_id,
        title: `Faltan ${dias} días para tu viaje`,
        message: `Prepara tus cosas que en falta poco para que comience ${name}`
      }
      await sendNotification(notification.user_id, notification.title, notification.message)
    })
  })
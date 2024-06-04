'use server'
const { query } = require('../../app/lib/db')

const createNotificationSocket = async (user_id, socket_id) => {
  try {
    const data = await query(
      'SELECT socket_id FROM notifications WHERE user_id = $1',
      [user_id]
    )
    if (data.rows.length > 0) {
      await query(
        'UPDATE notifications SET socket_id = $1 WHERE user_id = $2',
        [socket_id, user_id]
      )
    } else {
      await query(
        'INSERT INTO notifications (user_id, socket_id) VALUES ($1, $2)',
        [user_id, socket_id]
      )
    }
  } catch (error) {
    console.log(error)
    return { message: 'Error al guardar el socket' }
  }
}

const deleteNotificationSocket = async (socket_id) => {
  try {
    const data = await query('DELETE FROM notifications WHERE socket_id = $1', [
      socket_id
    ])
    if (data.affectedRows <= 0) {
      return { message: 'No se encontró el socket' }
    }
  } catch (error) {
    console.log(error)
    return { message: 'Error al guardar el socket' }
  }
}

const getNotificationSocket = async (user_id) => {
  try {
    const data = await query(
      'SELECT socket_id FROM notifications WHERE user_id = $1',
      [user_id]
    )
    if (data.rows.length > 0) {
      return data.rows[0].socket_id
    } else {
      return { message: 'No se encontró el socket' }
    }
  } catch (error) {
    console.log(error)
    return { message: 'Error al guardar el socket' }
  }
}

const getUsersFromTripsThatStartInDays = async (days) => {
  try {
    const data = await query(
      `
        SELECT trips.user_id, trips.name
        FROM trips
        WHERE initial_date = CURRENT_DATE + $1 * INTERVAL '1 day'
        UNION
        SELECT shared_trips.user_id, trips.name
        FROM shared_trips
        JOIN trips ON shared_trips.trip_id = trips.id
        WHERE trips.initial_date = CURRENT_DATE + $1 * INTERVAL '1 day' AND shared_trips.accepted = true
        `,
      [days]
    )

    if (data.rows.length > 0) {
      return data.rows
    } else {
      return { message: 'No se encontraron usuarios' }
    }
  } catch (error) {
    console.log(error)
    return { message: 'Error al guardar el socket' }
  }
}

module.exports = {
  createNotificationSocket,
  deleteNotificationSocket,
  getNotificationSocket,
  getUsersFromTripsThatStartInDays
}

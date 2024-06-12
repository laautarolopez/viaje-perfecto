'use server'

import { Subscription } from "../lib/types"
import { query } from '../lib/db'

export const createSubscriptions = async (user_id: string, endpoint: string, p256dh: string, auth: string) => {
  try {
    const data = await query(
      'SELECT * FROM subscriptions WHERE user_id = $1',
      [user_id]
    )
    if (data.rows.length > 0) {
      await query(
        'UPDATE subscriptions SET endpoint = $1, p256dh = $2, auth = $3 WHERE user_id = $4',
        [endpoint, p256dh, auth, user_id]
    )
    } else {
      await query(
        'INSERT INTO subscriptions (user_id, endpoint, p256dh, auth) VALUES ($1, $2, $3, $4)',
        [user_id, endpoint, p256dh, auth]
      )
    }
  } catch (error) {
    console.log(error)
    return { message: 'Error al guardar la subscripcion' }
  }
}

export const deleteSubscriptions = async (user_id: string) => {
  try {
    const data = await query('DELETE FROM subscriptions WHERE user_id = $1', [
      user_id
    ])
    if (data.affectedRows <= 0) {
      return { message: 'No se encontró la subscripcion' }
    }
  } catch (error) {
    console.log(error)
    return { message: 'Error al guardar la subscripcion' }
  }
}

export const getSubscriptions = async (user_id: string) => {
  try {
    const data = await query(
      'SELECT * FROM subscriptions WHERE user_id = $1',
      [user_id]
    )
    if (data.rows.length > 0) {
      const subscription = data.rows[0]
      return suscriptionToJson(subscription)
    } else {
      throw Error('No se encontró la subscripcion')
    }
  } catch (error) {
    console.log(error)
    throw Error('Error al guardar la subscripcion')
  }
}

const suscriptionToJson = (subscription: any): Subscription => {
  return {
    endpoint: subscription.endpoint, 
    expirationTime: null,
    keys: {
      p256dh: subscription.p256dh,
      auth: subscription.auth
    }
  }
}

export const getUsersFromTripsThatStartInDays = async (days: number) => {
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
    return { message: 'Error al guardar la subscripcion' }
  }
}
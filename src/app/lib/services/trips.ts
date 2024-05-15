import { NextTripInfo, Trip } from '../types'
import { apiService } from './api'
import { cookies } from 'next/headers'

// export const USER_ID = cookies().get('user_id')?.value

export const fetchNextTrip = async () => {
  const trip = await apiService<NextTripInfo>({
    hostname: 'http://localhost:3000/api', //pasar a variable de entorno
    pathname: 'next-trip',
    method: 'GET',
    headers: { user_id: cookies().get('user_id')?.value }
  })
  return trip
}

export const fetchNextTrips = async () => {
  const trips = await apiService<Trip[]>({
    hostname: 'http://localhost:3000/api/trips', //pasar a variable de entorno
    pathname: 'next-trips',
    method: 'GET',
    headers: { user_id: cookies().get('user_id')?.value }
  })
  return trips
}

export const fetchTripById = async (tripID: string) => {
  const trip = await apiService<Trip>({
    hostname: 'http://localhost:3000/api', //pasar a variable de entorno
    pathname: 'trips',
    method: 'GET',
    headers: { trip_id: tripID, user_id: cookies().get('user_id')?.value }
  })
  return trip
}

import { NextTripInfo, Trip } from '../types'
import { apiService } from './api'

export const USER_ID = '410544b2-4001-4271-9855-fec4b6a6442a' //esta hardcodeado, deberia ser una variable de entorno

export const fetchNextTrip = async () => {
  const trip = await apiService<NextTripInfo>({
    hostname: 'http://localhost:3000/api', //pasar a variable de entorno
    pathname: 'next-trip',
    method: 'GET',
    headers: { user_id: USER_ID }
  })
  return trip
}

export const fetchNextTrips = async () => {
  const trips = await apiService<Trip[]>({
    hostname: 'http://localhost:3000/api/trips', //pasar a variable de entorno
    pathname: 'next-trips',
    method: 'GET',
    headers: { user_id: USER_ID }
  })
  return trips
}

export const fetchTripById = async (tripID: string) => {
  const trip = await apiService<Trip>({
    hostname: 'http://localhost:3000/api', //pasar a variable de entorno
    pathname: 'trips',
    method: 'GET',
    headers: { trip_id: tripID }
  })
  return trip
}

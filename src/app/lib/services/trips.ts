import { NextTripInfo, Trip } from '../types'
import { apiService } from './api'

export const fetchNextTrip = async () => {
  const userID = '410544b2-4001-4271-9855-fec4b6a6442a' // esta hardcodeado para simular

  const trip = await apiService<NextTripInfo>({
    hostname: 'http://localhost:3000/api', //pasar a variable de entorno
    pathname: 'next-trip',
    method: 'GET',
    headers: { user_id: userID }
  })
  return trip
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

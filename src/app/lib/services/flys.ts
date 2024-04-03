import { Fly } from '../types'
import { apiService } from './api'

export const fetchFlys = async (tripID: string) => {
  const trip = await apiService<Fly[]>({
    hostname: 'http://localhost:3000/api', //pasar a variable de entorno
    pathname: 'flys',
    method: 'GET',
    headers: { trip_id: tripID }
  })
  return trip
}

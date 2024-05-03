import { Flight } from '../types'
import { apiService } from './api'

export const fetchFlys = async (tripID: string) => {
  const flys = await apiService<Flight[]>({
    hostname: 'http://localhost:3000/api', //pasar a variable de entorno
    pathname: 'flys',
    method: 'GET',
    headers: { trip_id: tripID }
  })
  return flys
}

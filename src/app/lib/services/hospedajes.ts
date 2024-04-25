import { Hospedaje } from '../types'
import { apiService } from './api'

export const fetchHospedajes = async (tripID: string) => {
  const hospedajes = await apiService<Hospedaje[]>({
    hostname: 'http://localhost:3000/api', //pasar a variable de entorno
    pathname: 'hospedajes',
    method: 'GET',
    headers: { trip_id: tripID }
  })
  return hospedajes
}

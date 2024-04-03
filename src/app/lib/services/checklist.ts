import { Note } from '../types'
import { apiService } from './api'

export const fetchChecklist = async (tripID: string) => {
  const checklist = await apiService<Note[]>({
    hostname: 'http://localhost:3000/api', //pasar a variable de entorno
    pathname: 'checklist',
    method: 'GET',
    headers: { trip_id: tripID }
  })
  return checklist
}

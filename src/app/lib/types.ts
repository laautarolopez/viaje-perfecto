export type User = {
  id: string
  username: string
  password: string
}

export type Trip = {
  id: string
  user_id: string
  name: string
  initial_date: string
  end_date: string
}

export type NextTripInfo = Trip & Partial<DepartureInfo>

export type Hospedaje = {
  id: string
  name: string
  start_date: string
  end_date: string
  phone: string
  address: string
  price_per_night: number
  paid: number
  trip_id: string
}

export type DepartureInfo = {
  departure_date: string
  departure_address: string
}

export type Fly = DepartureInfo & {
  id: string
  fly_number: string
  arrival_address: string
  arrival_date: string
  trip_id: string
}

// export type CheckList = {
//   id: string
//   notes: [Note]
//   trip_id: string
// }

export type Note = {
  id: string
  description: string
  is_checked: boolean
  created_date: string
  trip_id: string
}
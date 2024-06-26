export type UserCredentials = {
  email: string
  password: string
}

export type User = UserCredentials & {
  id: string
}

export type UserIdentification = { id: string; email: string }

export type SharedUserWithStatus = UserIdentification & {
  sharedId: string
  accepted: boolean
}

export type TripBasicInfo = {
  user_id: string
  name: string
  initial_date: string
  end_date: string
}

export type Trip = TripBasicInfo & {
  id: string
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

export type FlightBasicInfo = DepartureInfo & {
  fly_number: string
  arrival_address: string
  arrival_date: string
  trip_id: string
}

export type Flight = FlightBasicInfo & {
  id: string
}

export type SharedTripBasicInfo = {
  trip_id: string
  user_id: string
}

export type SharedTrip = SharedTripBasicInfo & {
  id: string
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

export type Subscription = {
  endpoint: string
  expirationTime: null
  keys: {
    p256dh: string
    auth: string
  }
}
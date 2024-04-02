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
  image: string
}

export type Hospedaje = {
  id: string
  nombre: string
  fecha_inicio: string
  fecha_fin: string
  imagen: string
  direccion: string
  trip_id: string
}

export type Fly = {
  id: string
  fly_number: string
  initial_date: string
  end_date: string
  fecha_fin: string
  arrival_address: string
  departure_address: string
  trip_id: string
}

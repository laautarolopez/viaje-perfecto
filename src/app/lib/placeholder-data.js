const user1ID = '410544b2-4001-4271-9855-fec4b6a6442a'
const trip2ID = '002544b2-4001-4271-9855-fec4b6a6442a'
const trip4ID = 'trip-4'

const users = [
  {
    id: user1ID,
    username: 'lautaro',
    password: '123456'
  }
]

const trips = [
  {
    id: 'trip-1',
    user_id: user1ID,
    name: 'Trip 1',
    initial_date: '2023-12-24',
    end_date: '2023-12-31',
    image: 'image1.jpg'
  },
  {
    id: 'trip-2',
    user_id: user1ID,
    name: 'Trip 2',
    initial_date: '2024-12-24',
    end_date: '2024-12-31',
    image: 'image2.jpg'
  },
  {
    id: 'trip-3',
    user_id: user1ID,
    name: 'Trip 3',
    initial_date: '2025-12-24',
    end_date: '2025-12-31',
    image: 'image3.jpg'
  },
  {
    id: 'trip-4',
    user_id: user1ID,
    name: 'Sur argentino',
    initial_date: '2024-04-15',
    end_date: '2024-04-25',
    image: 'image4.jpg'
  }
]

const flys = [
  {
    id: '001544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR123',
    arrival_address: 'Aeropuerto Ezeiza, Buenos Aires',
    departure_date: '2024-04-15T00:00:00',
    arrival_date: '2024-04-15T01:35:00',
    departure_address: 'Aeropuerto Bariloche',
    trip_id: trip4ID
  },
  {
    id: '002544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR124',
    arrival_address: 'Aeropuerto Bariloche',
    departure_date: '2024-04-19T16:00:00',
    arrival_date: '2024-04-19T18:00:00',
    departure_address: 'Aeropuerto Esquel',
    trip_id: trip4ID
  },
  {
    id: '002544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR125',
    arrival_address: 'Aeropuerto Esquel',
    departure_date: '2024-04-25T14:00:00',
    arrival_date: '2024-04-24T16:15:00',
    departure_address: 'Aeropuerto Ezeiza, Buenos Aires',
    trip_id: trip4ID
  }
]

// const checklist = {
//   id: '001544b3-4001-4271-9855-fec4b6a6442a',
//   notes: notes,
//   trip_id: trip2ID
// }

const notes = [
  {
    id: '001544b3-4001-4271-9855-fec4b6a6442b',
    description: 'Tengo mi documento',
    is_checked: true,
    create_date: '2023-12-24T14:00:00',
    trip_id: trip4ID
  },
  {
    id: '001544b3-4001-4271-9855-fec4b6a6442c',
    description: 'Agarre mi billetera y plata',
    is_checked: true,
    create_date: '2023-12-24T14:10:00',
    trip_id: trip4ID
  },
  {
    id: '001544b3-4001-4271-9855-fec4b6a6442d',
    description: 'Agarre mi licencia de conducir',
    is_checked: true,
    create_date: '2023-12-24T14:20:00',
    trip_id: trip4ID
  },
  {
    id: '001544b3-4001-4271-9855-fec4b6a6442e',
    description: 'Agarre mi pasaporte',
    is_checked: false,
    create_date: '2023-12-24T14:30:00',
    trip_id: trip4ID
  }
]

module.exports = {
  users,
  trips,
  flys,
  notes
}

const user1ID = '410544b2-4001-4271-9855-fec4b6a6442a'
const trip1ID = '001544b2-4001-4271-9855-fec4b6a6442a'
const trip2ID = '002544b2-4001-4271-9855-fec4b6a6442a'
const trip3ID = '003544b2-4001-4271-9855-fec4b6a6442a'
const trip4ID = '004544b2-4001-4271-9855-fec4b6a6442a'

const users = [
  {
    id: user1ID,
    username: 'lautaro',
    password: '123456'
  }
]

const trips = [
  {
    id: trip1ID,
    user_id: user1ID,
    name: 'Miami',
    initial_date: '2023-12-24',
    end_date: '2023-12-31',
    image: 'image1.jpg'
  },
  {
    id: trip2ID,
    user_id: user1ID,
    name: 'Mar del plata',
    initial_date: '2024-12-24',
    end_date: '2024-12-31',
    image: 'image2.jpg'
  },
  {
    id: trip3ID,
    user_id: user1ID,
    name: 'Mendoza',
    initial_date: '2024-02-24',
    end_date: '2024-03-07',
    image: 'image3.jpg'
  },
  {
    id: trip4ID,
    user_id: user1ID,
    name: 'Sur argentino',
    initial_date: '2024-04-15',
    end_date: '2024-04-25',
    image: 'image4.jpg'
  }
]

const flys = [
  {
    id: '002544b9-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR123',
    departure_address: 'Aeropuerto Ezeiza, Buenos Aires',
    departure_date: '2024-04-15T00:00:00',
    arrival_address: 'Aeropuerto Bariloche',
    arrival_date: '2024-04-15T01:35:00',
    trip_id: trip4ID
  },
  {
    id: '002544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR124',
    departure_address: 'Aeropuerto Bariloche',
    departure_date: '2024-04-19T16:00:00',
    arrival_address: 'Aeropuerto Esquel',
    arrival_date: '2024-04-19T18:00:00',
    trip_id: trip4ID
  },
  {
    id: '003544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR125',
    departure_address: 'Aeropuerto Esquel',
    departure_date: '2024-04-25T14:00:00',
    arrival_address: 'Aeropuerto Ezeiza, Buenos Aires',
    arrival_date: '2024-04-24T16:15:00',
    trip_id: trip4ID
  },
  {
    id: '004544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR126',
    departure_address: 'Aeropuerto Ezeiza, Buenos Aires',
    departure_date: '2023-12-24T14:00:00',
    arrival_address: 'Miami International Airport',
    arrival_date: '2023-12-24T23:20:00',
    trip_id: trip1ID
  },
  {
    id: '005544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR127',
    departure_address: 'Miami International Airport',
    departure_date: '2023-12-31T14:00:00',
    arrival_address: 'Aeropuerto Ezeiza, Buenos Aires',
    arrival_date: '2023-12-31T23:20:00',
    trip_id: trip1ID
  },
  {
    id: '006544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR128',
    departure_address: 'Aeropuerto Ezeiza, Buenos Aires',
    departure_date: '2024-12-24T10:00:00',
    arrival_address: 'Aeropuerto Mar del Plata',
    arrival_date: '2024-12-24T11:40:00',
    trip_id: trip2ID
  },
  {
    id: '007544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR129',
    departure_address: 'Aeropuerto Mar del Plata',
    departure_date: '2024-12-31T16:00:00',
    arrival_address: 'Aeropuerto Ezeiza, Buenos Aires',
    arrival_date: '2024-12-31T17:40:00',
    trip_id: trip2ID
  },
  {
    id: '008544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR130',
    departure_address: 'Aeroparque Jorge Newbery',
    departure_date: '2024-02-24T06:00:00',
    arrival_address: 'Aeropuerto Mendoza Capital',
    arrival_date: '2024-02-24T07:50:00',
    trip_id: trip3ID
  },
  {
    id: '009544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR131',
    departure_address: 'Aeropuerto Mendoza Capital',
    departure_date: '2024-03-06T23:25:00',
    arrival_address: 'Aeropuerto Ezeiza, Buenos Aires',
    arrival_date: '2024-03-07T01:00:00',
    trip_id: trip3ID
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
    created_date: '2023-12-24T14:00:00',
    trip_id: trip4ID
  },
  {
    id: '001544b3-4001-4271-9855-fec4b6a6442c',
    description: 'Agarre mi billetera y plata',
    is_checked: true,
    created_date: '2023-12-24T14:10:00',
    trip_id: trip4ID
  },
  {
    id: '001544b3-4001-4271-9855-fec4b6a6442d',
    description: 'Agarre mi licencia de conducir',
    is_checked: true,
    created_date: '2023-12-24T14:20:00',
    trip_id: trip4ID
  },
  {
    id: '001544b3-4001-4271-9855-fec4b6a6442e',
    description: 'Agarre mi pasaporte',
    is_checked: false,
    created_date: '2023-12-24T14:30:00',
    trip_id: trip4ID
  }
]

module.exports = {
  users,
  trips,
  flys,
  notes
}

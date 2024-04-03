export const user1ID = '410544b2-4001-4271-9855-fec4b6a6442a'
export const trip4ID = '004544b2-4001-4271-9855-fec4b6a6442a'

const users = [
  {
    id: user1ID,
    username: 'lautaro',
    password: '123456'
  }
]

const trips = [
  {
    id: '001544b2-4001-4271-9855-fec4b6a6442a',
    user_id: user1ID,
    name: 'Trip 1',
    initial_date: '2023-12-24',
    end_date: '2023-12-31',
    image: 'image1.jpg'
  },
  {
    id: '002544b2-4001-4271-9855-fec4b6a6442a',
    user_id: user1ID,
    name: 'Trip 2',
    initial_date: '2024-12-24',
    end_date: '2024-12-31',
    image: 'image2.jpg'
  },
  {
    id: '003544b2-4001-4271-9855-fec4b6a6442a',
    user_id: user1ID,
    name: 'Trip 3',
    initial_date: '2025-12-24',
    end_date: '2025-12-31',
    image: 'image3.jpg'
  },
  {
    id: '004544b2-4001-4271-9855-fec4b6a6442a',
    user_id: user1ID,
    name: 'Trip 4',
    initial_date: '2024-06-24',
    end_date: '2024-07-30',
    image: 'image4.jpg'
  }
]

const flys = [
  {
    id: '001544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR123',
    arrival_address: 'Buenos Aires',
    departure_date: '2023-12-24T14:00:00',
    arrival_date: '2023-12-31T10:00:00',
    departure_address: 'Miami',
    trip_id: trip4ID
  },
  {
    id: '002544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR124',
    arrival_address: 'Miami',
    departure_date: '2024-12-24T16:00:00',
    arrival_date: '2024-12-31T11:00:00',
    departure_address: 'Buenos Aires',
    trip_id: trip4ID
  }
]
module.exports = {
  users,
  trips,
  flys
}

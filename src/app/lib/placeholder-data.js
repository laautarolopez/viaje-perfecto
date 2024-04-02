const user1ID = '410544b2-4001-4271-9855-fec4b6a6442a'
const user2ID = '410544b2-4001-4271-9855-fec4b6a6442b'

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

module.exports = {
  users,
  trips
}

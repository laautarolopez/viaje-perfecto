const { query, end } = require('../../app/lib/db.js');
const bcrypt = require('bcrypt')

const user1ID = '410544b2-4001-4271-9855-fec4b6a6442a'
const trip1ID = '001544b2-4001-4271-9855-fec4b6a6442a'
const trip2ID = '002544b2-4001-4271-9855-fec4b6a6442a'
const trip3ID = '003544b2-4001-4271-9855-fec4b6a6442a'
const trip4ID = '004544b2-4001-4271-9855-fec4b6a6442a'

const users = [
  {
    id: user1ID,
    email: 'prueba@gmail.com',
    password: '123456'
  }
]

const trips = [
  {
    id: trip1ID,
    user_id: user1ID,
    name: 'Miami',
    initial_date: '2023-12-24',
    end_date: '2023-12-31'
  },
  {
    id: trip2ID,
    user_id: user1ID,
    name: 'Mar del plata',
    initial_date: '2024-12-24',
    end_date: '2024-12-31'
  },
  {
    id: trip3ID,
    user_id: user1ID,
    name: 'Mendoza',
    initial_date: '2024-02-24',
    end_date: '2024-03-07'
  },
  {
    id: trip4ID,
    user_id: user1ID,
    name: 'Sur argentino',
    initial_date: '2024-06-15',
    end_date: '2024-06-25'
  }
]

const flys = [
  {
    id: '002544b9-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR123',
    departure_address: 'Aeropuerto Ezeiza, Buenos Aires',
    departure_date: '2024-06-15T00:00:00',
    arrival_address: 'Aeropuerto Bariloche',
    arrival_date: '2024-06-15T01:35:00',
    trip_id: trip4ID
  },
  {
    id: '002544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR124',
    departure_address: 'Aeropuerto Bariloche',
    departure_date: '2024-06-19T16:00:00',
    arrival_address: 'Aeropuerto Esquel',
    arrival_date: '2024-06-19T18:00:00',
    trip_id: trip4ID
  },
  {
    id: '003544b2-4001-4271-9855-fec4b6a6442a',
    fly_number: 'AR125',
    departure_address: 'Aeropuerto Esquel',
    departure_date: '2024-06-25T14:00:00',
    arrival_address: 'Aeropuerto Ezeiza, Buenos Aires',
    arrival_date: '2024-06-25T16:15:00',
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

const hospedajes = [
  // {
  //   id: '001544b3-4001-4271-9855-fec4b6a6442a',
  //   name: 'Hotel Hilton',
  //   address: 'Miami, Florida',
  //   phone: '123456789',
  //   check_in_date: '2023-12-24T14:00:00',
  //   check_out_date: '2023-12-31T10:00:00',
  //   trip_id: trip1ID
  // },
  // {
  //   id: '001544b3-4001-4271-9855-fec4b6a6442b',
  //   name: 'Hotel Costa Galana',
  //   address: 'Mar del Plata, Buenos Aires',
  //   phone: '123456789',
  //   check_in_date: '2024-12-24T14:00:00',
  //   check_out_date: '2024-12-31T10:00:00',
  //   trip_id: trip2ID
  // },
  // {
  //   id: '001544b3-4001-4271-9855-fec4b6a6442c',
  //   name: 'Hotel Diplomatic',
  //   address: 'Mendoza, Mendoza',
  //   phone: '123456789',
  //   check_in_date: '2024-02-24T14:00:00',
  //   check_out_date: '2024-03-07T10:00:00',
  //   trip_id: trip3ID
  // },
  {
    id: '001544b3-4001-4271-9855-fec4b6a6442d',
    name: 'Hotel Llao Llao',
    start_date: '2024-05-15T08:00:00',
    end_date: '2024-05-19T08:00:00',
    phone: '1194428530',
    address: 'Av. Ezequiel Bustillo Km. 25, Bariloche, Río Negro',
    price_per_night: 30000,
    paid: 0,
    trip_id: trip4ID
  },
  {
    id: '001544b3-4001-4271-9855-fec4b6a6442e',
    name: 'Sol del sur',
    start_date: '2024-05-19T10:00:00',
    end_date: '2024-05-25T10:00:00',
    phone: '1123441147',
    address: '9 de Julio 1086, Esquel, Chubut',
    price_per_night: 25000,
    paid: 10000,
    trip_id: trip4ID
  }
]

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

export async function runSeed() {
    try {
      // Eliminar la tabla "notes" si existe
      await query(`DROP TABLE IF EXISTS notes`)
  
      // Eliminar la tabla "flys" si existe
      await query(`DROP TABLE IF EXISTS flys`)
  
      // Eliminar la tabla "hospedajes" si existe
      await query(`DROP TABLE IF EXISTS hospedajes`)
  
      // Eliminar la tabla "trips" si existe
      await query(`DROP TABLE IF EXISTS trips`)
  
      // Eliminar la tabla "users" si existe
      await query(`DROP TABLE IF EXISTS users`)
  
      // Crear la tabla "users" si no existe
      const createUsersTable = await query(`
              CREATE TABLE IF NOT EXISTS users (
                  id UUID PRIMARY KEY,
                  email TEXT NOT NULL UNIQUE,
                  password TEXT NOT NULL
              );
          `)
      console.log(`Created "users" table`)
  
      // Crear la tabla "trips" si no existe, image va a ser  de tipo BLOB
      const createTripsTable = await query(`
          CREATE TABLE trips (
              id UUID PRIMARY KEY,
              user_id UUID REFERENCES users(id),
              name TEXT NOT NULL,
              initial_date DATE NOT NULL,
              end_date DATE NOT NULL
          );
      `)
      console.log(`Created "trips" table`)
  
      const createFlysTable = await query(`
          CREATE TABLE flys (
              id UUID PRIMARY KEY,
              fly_number TEXT NOT NULL,
              arrival_address TEXT NOT NULL,
              departure_date TIMESTAMP NOT NULL,
              arrival_date TIMESTAMP NOT NULL,
              departure_address TEXT NOT NULL,
              trip_id UUID REFERENCES trips(id)
          );`)
  
      console.log(`Created "flys" table`)
  
      const createHospedajesTable = await query(`
          CREATE TABLE hospedajes (
              id UUID PRIMARY KEY,
              name TEXT NOT NULL,
              start_date TIMESTAMP NOT NULL,
              end_date TIMESTAMP NOT NULL,
              phone TEXT NOT NULL,
              address TEXT NOT NULL,
              price_per_night NUMERIC NOT NULL,
              paid NUMERIC DEFAULT 0,
              trip_id UUID REFERENCES trips(id)
          );`)
  
      console.log(`Created "hospedajes" table`)
  
      const createNotesTable = await query(`
        CREATE TABLE notes (
            id UUID PRIMARY KEY,
            description TEXT NOT NULL,
            is_checked BOOLEAN NOT NULL DEFAULT FALSE,
            created_date TIMESTAMP NOT NULL DEFAULT NOW(),
            trip_id UUID REFERENCES trips(id)
        );`)
  
      console.log(`Created "notes" table`)
  
      // Insertar datos en la tabla "users"
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10)
          return query(
            `
                      INSERT INTO users (id, email, password)
                      VALUES ($1, $2, $3)
                      ON CONFLICT (id) DO NOTHING;
                  `,
            [user.id, user.email, hashedPassword]
          )
        })
      )
  
      const insertedTrips = await Promise.all(
        trips.map(async (trip) => {
          return query(
            `
              INSERT INTO trips (id, user_id, name, initial_date, end_date)
              VALUES ($1, $2, $3, $4, $5)
              ON CONFLICT (id) DO NOTHING;
          `,
            [trip.id, trip.user_id, trip.name, trip.initial_date, trip.end_date]
          )
        })
      )
  
      const insertedFlys = await Promise.all(
        flys.map(async (fly) => {
          return query(
            `
              INSERT INTO flys (id, fly_number, arrival_address, departure_date, arrival_date, departure_address, trip_id)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              ON CONFLICT (id) DO NOTHING;
          `,
            [
              fly.id,
              fly.fly_number,
              fly.arrival_address,
              fly.departure_date,
              fly.arrival_date,
              fly.departure_address,
              fly.trip_id
            ]
          )
        })
      )
  
      const insertedHospedajes = await Promise.all(
        hospedajes.map(async (hospedaje) => {
          return query(`
              INSERT INTO hospedajes (id, name, start_date, end_date, phone, address, price_per_night, paid, trip_id)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
              ON CONFLICT (id) DO NOTHING;
          `, [hospedaje.id, hospedaje.name, hospedaje.start_date, hospedaje.end_date, hospedaje.phone, hospedaje.address, hospedaje.price_per_night, hospedaje.paid, hospedaje.trip_id])
        })
      )
  
      const insertedNotes = await Promise.all(
        notes.map(async (note) => {
          return query(`
              INSERT INTO notes (id, description, is_checked, created_date, trip_id)
              VALUES ($1, $2, $3, $4, $5)
              ON CONFLICT (id) DO NOTHING;
          `,
            [
              note.id,
              note.description,
              note.is_checked,
              note.created_date,
              note.trip_id
            ]
          )
        })
      )
      
      await end()

      // Return created tables and seeded users
      return {
        createUsersTable,
        createTripsTable,
        createFlysTable,
        createHospedajesTable,
        createNotesTable,
        users: insertedUsers,
        trips: insertedTrips,
        flys: insertedFlys,
        hospedajes: insertedHospedajes,
        notes: insertedNotes
      }
    } catch (error) {
      console.error('Error seeding users:', error)
      throw error
    }
}
const { query, end } = require('../../app/lib/db.js');
const bcrypt = require('bcrypt')

const userID = '009544b2-4001-4271-9855-fec4b6a6442b'
const tripID = '004544b2-4001-4271-9855-fec4b6a6442b'

const users = [
  {
    id: userID,
    email: 'prueba10@gmail.com',
    password: '123456'
  }
]

const trips = [
  {
    id: tripID,
    user_id: userID,
    name: 'Sur argentino',
    initial_date: '2024-07-15',
    end_date: '2024-07-25'
  }
]

const notes = [
  {
    id: '001544b3-4001-4271-9855-fec4b6a6441b',
    description: 'Tengo mi documento',
    is_checked: true,
    created_date: '2023-12-24T14:00:00',
    trip_id: tripID
  },
  {
    id: '001544b3-4001-4271-9855-fec4b6a6441c',
    description: 'Agarre mi billetera y plata',
    is_checked: true,
    created_date: '2023-12-24T14:10:00',
    trip_id: tripID
  },
  {
    id: '001544b3-4001-4271-9855-fec4b6a6441d',
    description: 'Agarre mi licencia de conducir',
    is_checked: true,
    created_date: '2023-12-24T14:20:00',
    trip_id: tripID
  },
  {
    id: '001544b3-4001-4271-9855-fec4b6a6441e',
    description: 'Agarre mi pasaporte',
    is_checked: false,
    created_date: '2023-12-24T14:30:00',
    trip_id: tripID
  }
]

async function deleteSeed() {
    try {  
      const deleteNotes = await Promise.all(
        notes.map(async (note) => {
          return query(`DELETE FROM notes WHERE id = $1`, [note.id])
        })
      )

      const deleteTrips = await Promise.all(
        trips.map(async (trip) => {
          return query(`DELETE FROM trips WHERE id = $1`, [trip.id])
        })
      )

      // Borrar datos en la tabla "users"
      const deleteUsers = await Promise.all(
        users.map(async (user) => {
          return query(`DELETE FROM users WHERE id = $1`, [user.id])
        })
      )
      
      await end()

      // Return created tables and seeded users
      return {
        users: deleteUsers,
        trips: deleteTrips,
        notes: deleteNotes
      }
    } catch (error) {
      console.error('Error delete seeding:', error)
      throw error
    }
}

async function runSeed() {
  try {  
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
        CREATE TABLE IF NOT EXISTS trips (
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            name TEXT NOT NULL,
            initial_date DATE NOT NULL,
            end_date DATE NOT NULL
        );
    `)
    console.log(`Created "trips" table`)

    // Crear la tabla "subscriptions" si no existe, image va a ser  de tipo BLOB
    const createSubscriptionsTable = await query(`
        CREATE TABLE IF NOT EXISTS subscriptions (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id),
            endpoint TEXT NOT NULL,
            p256dh TEXT NOT NULL,
            auth TEXT NOT NULL
        );
    `)
    console.log(`Created "subscriptions" table`)

    // Crear la tabla "notifications" si no existe, image va a ser  de tipo BLOB
    const createNotificationsTable = await query(`
        CREATE TABLE IF NOT EXISTS notifications (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id),
            title TEXT NOT NULL,
            message TEXT NOT NULL
        );
    `)
    console.log(`Created "notifications" table`)

    // Crear la tabla "shared_trips" si no existe, image va a ser  de tipo BLOB
    const createSharedTripsTable = await query(`
        CREATE TABLE IF NOT EXISTS shared_trips (
            id UUID PRIMARY KEY,
            trip_id UUID REFERENCES trips(id),
            user_id UUID REFERENCES users(id),
            accepted BOOLEAN DEFAULT FALSE
        );
    `)
    console.log(`Created "shared_trips" table`)

    const createFlysTable = await query(`
        CREATE TABLE IF NOT EXISTS flys (
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
        CREATE TABLE IF NOT EXISTS hospedajes (
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
      CREATE TABLE IF NOT EXISTS notes (
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

    // Return created tables and seeded users
    return {
      createUsersTable,
      createTripsTable,
      createSubscriptionsTable,
      createNotificationsTable,
      createSharedTripsTable,
      createFlysTable,
      createHospedajesTable,
      createNotesTable,
      users: insertedUsers,
      trips: insertedTrips,
      notes: insertedNotes
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

module.exports = { tripID, userID, notes, deleteSeed, runSeed }
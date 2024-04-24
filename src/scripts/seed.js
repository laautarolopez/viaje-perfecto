const { query, end } = require('../app/lib/db.js')
const { users, trips, flys, notes } = require('../app/lib/placeholder-data.js')
const bcrypt = require('bcrypt')

async function seed() {
  try {
    await query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    // Eliminar la tabla "notes" si existe
    await query(`DROP TABLE IF EXISTS notes`)

    // Eliminar la tabla "flys" si existe
    await query(`DROP TABLE IF EXISTS flys`)

    // Eliminar la tabla "trips" si existe
    await query(`DROP TABLE IF EXISTS trips`)

    // Eliminar la tabla "users" si existe
    await query(`DROP TABLE IF EXISTS users`)

    // Crear la tabla "users" si no existe
    const createUsersTable = await query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `)
    console.log(`Created "users" table`)

    // Crear la tabla "trips" si no existe, image va a ser  de tipo BLOB
    const createTripsTable = await query(`
        CREATE TABLE trips (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id),
            name TEXT NOT NULL,
            initial_date DATE NOT NULL,
            end_date DATE NOT NULL
        );
    `)
    console.log(`Created "trips" table`)

    const createFlysTable = await query(`
        CREATE TABLE flys (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            fly_number TEXT NOT NULL,
            arrival_address TEXT NOT NULL,
            departure_date TIMESTAMP NOT NULL,
            arrival_date TIMESTAMP NOT NULL,
            departure_address TEXT NOT NULL,
            trip_id UUID REFERENCES trips(id)
        );`)

    console.log(`Created "flys" table`)

    const createNotesTable = await query(`
      CREATE TABLE notes (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          description TEXT NOT NULL,
          is_checked BOOLEAN NOT NULL DEFAULT FALSE,
          created_date TIMESTAMP NOT NULL DEFAULT NOW(),
          trip_id UUID REFERENCES trips(id)
      );`)

    console.log(`Created "notes" table`)

    // export type Fly = {
    //   id: string
    //   fly_number: string
    //   arrival_address: string
    //   arrival_date: string
    //   departure_date: string
    //   departure_address: string
    //   trip_id: string
    // }
    //inlcude time on dates

    // Insertar datos en la tabla "users"
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        return query(
          `
                    INSERT INTO users (id, username, password)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (id) DO NOTHING;
                `,
          [user.id, user.username, hashedPassword]
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

    const insertedNotes = await Promise.all(
      notes.map(async (note) => {
        return query(
          `
            INSERT INTO notes (id, description, is_checked,created_date, trip_id)
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
      createFlysTable,
      createNotesTable,
      users: insertedUsers,
      trips: insertedTrips,
      flys: insertedFlys,
      notes: insertedNotes
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function main() {
  await seed()
  await end()
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err)
})

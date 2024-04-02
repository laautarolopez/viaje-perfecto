const { db } = require('@vercel/postgres')
const { users, trips } = require('../app/lib/placeholder-data.js')
const bcrypt = require('bcrypt')

async function seed(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    // Eliminar la tabla "trips" si existe
    await client.sql`DROP TABLE IF EXISTS trips`
    console.log(`Dropped "trips" table`)

    // Eliminar la tabla "users" si existe
    await client.sql`DROP TABLE IF EXISTS users`
    console.log(`Dropped "users" table`)

    // Crear la tabla "users" si no existe
    const createUsersTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `
    console.log(`Created "users" table`)

    // Crear la tabla "trips" si no existe, image va a ser  de tipo BLOB
    const createTripsTable = await client.sql`
        CREATE TABLE trips (
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            name TEXT NOT NULL,
            initial_date DATE NOT NULL,
            end_date DATE NOT NULL,
            image TEXT NOT NULL
        );
    `
    console.log(`Created "trips" table`)

    // Insertar datos en la tabla "users"
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        return client.sql`
                    INSERT INTO users (id, username, password)
                    VALUES (${user.id}, ${user.username}, ${hashedPassword})
                    ON CONFLICT (id) DO NOTHING;
                `
      })
    )
    console.log(`Seeded ${insertedUsers.length} users`)

    const insertedTrips = await Promise.all(
      trips.map(async (trip) => {
        return client.sql`
            INSERT INTO trips (id, user_id, name, initial_date, end_date, image)
            VALUES (${trip.id}, ${trip.user_id}, ${trip.name}, ${trip.initial_date}, ${trip.end_date}, ${trip.image})
            ON CONFLICT (id) DO NOTHING;
        `
      })
    )
    // Return created tables and seeded users
    return {
      createUsersTable,
      createTripsTable,
      users: insertedUsers,
      trips: insertedTrips
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await seed(client)

  await client.end()
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err)
})

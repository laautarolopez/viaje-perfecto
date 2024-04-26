import { host, user1_id, trip4_id } from "../config.test"

const fetchTrips = async (method: string, user_id?: string) => {
    const response = await fetch(`${host}/api/trips/next-trips`, {
        method: method,
        headers: {
            ...(user_id && {'user_id': user_id}),
        }
    })

    return response
}

const fetchTripById = async (method: string, trip_id?: string) => {
    const response = await fetch(`${host}/api/trips`, {
        method: method,
        headers: {
            ...(trip_id && {'trip_id': trip_id})
        }
    })

    return response
}

test("Obtener viajes sin mandarle el user_id", async () => {
    const response = await fetchTrips("GET")
    const data = await response.json()
    const cant_viajes = data.length
    
    expect(response.status).toBe(200)
    expect(cant_viajes).toBe(0)
})

test("Obtener viajes de un usuario", async () => {
    const response = await fetchTrips("GET", user1_id)
    const data = await response.json()
    const cant_viajes = data.length
    
    expect(response.status).toBe(200)
    expect(cant_viajes).toBe(2)
})

test("Obtener viaje por id sin enviarle el id", async () => {
    const response = await fetchTripById("GET")
    const data = await response.json()

    expect(data.error).toBe("There is no trip with that id.")
})

test("Obtener viaje por id enviandole un id que no existe", async () => {
    const response = await fetchTripById("GET", '000544b2-4001-4271-9855-fec4b6a6442a')
    const data = await response.json()

    expect(data.error).toBe("There is no trip with that id.")
})

test("Obtener viaje por id", async () => {
    const response = await fetchTripById("GET", trip4_id)
    const data = await response.json()

    expect(data.id).toBe(trip4_id)
    expect(data.name).toBe('Sur argentino')
})
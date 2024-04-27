import { host, trip4_id } from "../config.test"

const fetchFlys = async (method: string, trip_id?: string) => {
    const response = await fetch(`${host}/api/flys`, {
        method: method,
        headers: {
            ...(trip_id && {'trip_id': trip_id})
        }
    })

    return response
}

test("Obtener vuelos sin mandarle el trip_id", async () => {
    const response = await fetchFlys("GET")
    const data = await response.json()
    const cant_vuelos = data.length
    
    expect(response.status).toBe(200)
    expect(cant_vuelos).toBe(0)
})

test("Obtener vuelos de un viaje", async () => {
    const response = await fetchFlys("GET", trip4_id)
    const data = await response.json()
    const cant_vuelos = data.length
    
    expect(response.status).toBe(200)
    expect(cant_vuelos).toBe(3)
})
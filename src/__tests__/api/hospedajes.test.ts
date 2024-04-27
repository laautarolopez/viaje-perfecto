import { host, trip4_id } from "../config.test"

const fetchHospedajes = async (method: string, trip_id?: string) => {
    const response = await fetch(`${host}/api/hospedajes`, {
        method: method,
        headers: {
            ...(trip_id && {'trip_id': trip_id})
        }
    })

    return response
}

test("Obtener hospedajes sin mandarle el trip_id", async () => {
    const response = await fetchHospedajes("GET")
    const data = await response.json()
    const cant_hospedajes = data.length
    
    expect(response.status).toBe(200)
    expect(cant_hospedajes).toBe(0)
})

test("Obtener hospedajes de un viaje", async () => {
    const response = await fetchHospedajes("GET", trip4_id)
    const data = await response.json()
    const cant_hospedajes = data.length
    
    expect(response.status).toBe(200)
    expect(cant_hospedajes).toBe(2)
})
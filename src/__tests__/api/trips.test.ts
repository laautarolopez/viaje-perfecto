import { apiHandler, sur_argentino_id, user1_id } from "../config.test"
import * as nextTripsHandler from '@/app/api/trips/next-trips/route';
import * as tripsHandler from '@/app/api/trips/route';
import { runSeed } from './helper'

beforeAll(async () => {
  await runSeed()
})

it("No se obtienen viajes al no mandar el user_id", async () => {
  await apiHandler(nextTripsHandler, "GET", {}, async (response: any) => {
    const data = await response.json();
    const cant_viajes = data.length
    
    expect(response.status).toBe(200);
    expect(cant_viajes).toBe(0)
  })
});

it("Se obtienen 2 viajes al buscar los del usuario 1", async () => {
    await apiHandler(nextTripsHandler, "GET", {'user_id': user1_id}, async (response: any) => {
      const data = await response.json();
      const cant_viajes = data.length
      
      expect(response.status).toBe(200);
      expect(cant_viajes).toBe(2)
    })
});

it("Se obtiene un error al buscar un viaje por id sin mandar el trip_id", async () => {
  await apiHandler(tripsHandler, "GET", {}, async (response: any) => {
    const data = await response.json();
    
    expect(data.error).toBe("There is no trip with that id.")
  })
});

it("Se obtiene un error al buscar un viaje por id inexistente", async () => {
    const id_inexistente = '000544b2-4001-4271-9855-fec4b6a6442a'

    await apiHandler(tripsHandler, "GET", {'trip_id': id_inexistente}, async (response: any) => {
      const data = await response.json();
      
      expect(data.error).toBe("There is no trip with that id.")
    })
});

it("Se obtienen el viaje Sur argentino al buscarlo por su id", async () => {
  await apiHandler(tripsHandler, "GET", {'trip_id': sur_argentino_id}, async (response: any) => {
    const data = await response.json();
    
    expect(data.id).toBe(sur_argentino_id)
    expect(data.name).toBe('Sur argentino')
  })
});
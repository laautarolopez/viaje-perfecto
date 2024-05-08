import { apiHandler, sur_argentino_id } from "../config.test"
import * as hospedajesHandler from '@/app/api/hospedajes/route';
import { runSeed } from './helper'

beforeAll(async () => {
  await runSeed()
})

it("No se obtienen hospedajes al no mandar el trip_id", async () => {
  await apiHandler(hospedajesHandler, "GET", {}, async (response: any) => {
    const data = await response.json();
    const cant_hospedajes = data.length
    
    expect(response.status).toBe(200);
    expect(cant_hospedajes).toBe(0)
  })
});

it("Se obtienen 2 hospedajes al buscar los del viaje Sur argentino", async () => {
  await apiHandler(hospedajesHandler, "GET", {'trip_id': sur_argentino_id}, async (response: any) => {
    const data = await response.json();
    const cant_hospedajes = data.length
    
    expect(response.status).toBe(200);
    expect(cant_hospedajes).toBe(2)
  })
});
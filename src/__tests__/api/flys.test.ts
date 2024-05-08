import { apiHandler, sur_argentino_id } from "../config.test"
import * as flysHandler from '@/app/api/flys/route';
import { runSeed } from './helper'

beforeAll(async () => {
  await runSeed()
})

it("No se obtienen vuelos al no mandar el trip_id", async () => {
  await apiHandler(flysHandler, "GET", {}, async (response: any) => {
    const data = await response.json();
    const cant_vuelos = data.length
    
    expect(response.status).toBe(200);
    expect(cant_vuelos).toBe(0)
  })
});

it("Se obtienen 3 vuelos al buscar los del viaje Sur argentino", async () => {
  await apiHandler(flysHandler, "GET", {'trip_id': sur_argentino_id}, async (response: any) => {
    const data = await response.json();
    const cant_vuelos = data.length
    
    expect(response.status).toBe(200);
    expect(cant_vuelos).toBe(3)
  })
});
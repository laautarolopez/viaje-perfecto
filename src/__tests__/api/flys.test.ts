import { testApiHandler, apiHandler, sur_argentino_id } from "../config.test"
import * as appHandler from '@/app/api/flys/route';
import { runSeed } from './helper'

beforeAll(async () => {
  await runSeed()
})

it.skip("No se obtienen vuelos al no mandar el trip_id", async () => {
  await apiHandler(appHandler, "GET", {}, async (response: any) => {
    const data = await response.json();
    const cant_vuelos = data.length
    
    expect(response.status).toBe(200);
    expect(cant_vuelos).toBe(0)
  })
});

it.skip("Se obtienen 3 vuelos al buscar los del viaje Sur argentino", async () => {
    await testApiHandler({
      appHandler,
      requestPatcher(request: Request) {
        request.headers.set('trip_id', sur_argentino_id);
      },
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: "GET" });
        const data = await response.json();
        const cant_vuelos = data.length
        
        expect(response.status).toBe(200);
        expect(cant_vuelos).toBe(3)
      },
    });
});
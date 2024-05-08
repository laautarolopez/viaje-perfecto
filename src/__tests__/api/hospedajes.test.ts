import { testApiHandler, sur_argentino_id } from "../config.test"
import * as appHandler from '@/app/api/hospedajes/route';
import { runSeed } from './helper'

beforeAll(async () => {
  await runSeed()
})

it.skip("No se obtienen hospedajes al no mandar el trip_id", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: "GET" });
        const data = await response.json();
        const cant_hospedajes = data.length
        
        expect(response.status).toBe(200);
        expect(cant_hospedajes).toBe(0)
      },
    });
});

it.skip("Se obtienen 2 hospedajes al buscar los del viaje Sur argentino", async () => {
    await testApiHandler({
      appHandler,
      requestPatcher(request: Request) {
        request.headers.set('trip_id', sur_argentino_id);
      },
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: "GET" });
        const data = await response.json();
        const cant_hospedajes = data.length
        
        expect(response.status).toBe(200);
        expect(cant_hospedajes).toBe(2)
      },
    });
});
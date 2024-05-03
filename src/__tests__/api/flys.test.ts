import { testApiHandler, sur_argentino_id } from "../config.test"
import * as appHandler from '@/app/api/flys/route';

it("No se obtienen vuelos al no mandar el trip_id", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: "GET" });
        const data = await response.json();
        const cant_vuelos = data.length
        
        expect(response.status).toBe(200);
        expect(cant_vuelos).toBe(0)
      },
    });
});

it("Se obtienen 3 vuelos al buscar los del viaje Sur argentino", async () => {
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
import { testApiHandler, sur_argentino_id, user1_id } from "../config.test"
import * as appHandler from '@/app/api/trips/next-trips/route';

it("No se obtienen viajes al no mandar el user_id", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: "GET" });
        const data = await response.json();
        const cant_viajes = data.length
        
        expect(response.status).toBe(200);
        expect(cant_viajes).toBe(0)
      },
    });
});

it("Se obtienen 2 viajes al buscar los del usuario 1", async () => {
    await testApiHandler({
      appHandler,
      requestPatcher(request: Request) {
        request.headers.set('user_id', user1_id);
      },
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: "GET" });
        const data = await response.json();
        const cant_viajes = data.length
        
        expect(response.status).toBe(200);
        expect(cant_viajes).toBe(2)
      },
    });
});

it("Se obtiene un error al buscar un viaje por id sin mandar el trip_id", async () => {
    const appHandler = require('../../app/api/trips/route')
    await testApiHandler({
      appHandler,
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: "GET" });
        const data = await response.json();
        
        expect(data.error).toBe("There is no trip with that id.")
      },
    });
});

it("Se obtiene un error al buscar un viaje por id inexistente", async () => {
    const id_inexistente = '000544b2-4001-4271-9855-fec4b6a6442a'

    const appHandler = require('../../app/api/trips/route')
    await testApiHandler({
      appHandler,
      requestPatcher(request: Request) {
        request.headers.set('trip_id', id_inexistente);
      },
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: "GET" });
        const data = await response.json();
        
        expect(data.error).toBe("There is no trip with that id.")
      },
    });
});

it("Se obtienen el viaje Sur argentino al buscarlo por su id", async () => {
    const appHandler = require('../../app/api/trips/route')
    await testApiHandler({
      appHandler,
      requestPatcher(request: Request) {
        request.headers.set('trip_id', sur_argentino_id);
      },
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: "GET" });
        const data = await response.json();
        
        expect(data.id).toBe(sur_argentino_id)
        expect(data.name).toBe('Sur argentino')
      },
    });
});
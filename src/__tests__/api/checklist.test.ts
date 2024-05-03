import { testApiHandler, sur_argentino_id } from "../config.test"
import * as appHandler from '@/app/api/checklist/route';
const note_id = '001544b3-4001-4271-9855-fec4b6a6442e'

it("No se obtienen checklist al no mandar el trip_id", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: "GET" });
        const data = await response.json();
        const cant_notes = data.length
        
        expect(response.status).toBe(200);
        expect(cant_notes).toBe(0)
      },
    });
});

it("Se obtienen 4 notas de una checklist al buscar las del viaje Sur argentino", async () => {
    await testApiHandler({
      appHandler,
      requestPatcher(request: Request) {
        request.headers.set('trip_id', sur_argentino_id);
      },
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: "GET" });
        const data = await response.json();
        const cant_notes = data.length
        
        expect(response.status).toBe(200);
        expect(cant_notes).toBe(5)
      },
    });
});

it("Se actualiza el estado de una nota", async () => {
  // Se verifica que si la nota está completada o no
  let is_checked: boolean;
  {
  const appHandler = require('../../app/api/checklist/id/route')
  await testApiHandler({
    appHandler,
    requestPatcher(request: Request) {
      request.headers.set('note_id', note_id);
    },
    test: async ({ fetch }: { fetch: any }) => {
      const response = await fetch({ method: "GET" });
      const data = await response.json();
      is_checked = data.is_checked
      
      expect(response.status).toBe(200)
    },
  });
  }

  // Se actualiza el estado de la nota
  await testApiHandler({
    appHandler,
    requestPatcher(request: Request) {
      request.headers.set('note_id', note_id);
    },
    test: async ({ fetch }: { fetch: any }) => {
      const response = await fetch({ method: "PATCH" });
      const data = await response.json();
      
      expect(response.status).toBe(200)
      expect(data.message).toBe('Note updated')
    },
  });

  // Se verifica que la nota cambió de estado
  {
  const appHandler = require('../../app/api/checklist/id/route')
  await testApiHandler({
    appHandler,
    requestPatcher(request: Request) {
      request.headers.set('note_id', note_id);
    },
    test: async ({ fetch }: { fetch: any }) => {
      const response = await fetch({ method: "GET" });
      const data = await response.json();
      
      expect(response.status).toBe(200)
      expect(data.is_checked).toBe(!is_checked)
    },
  });
  }
})
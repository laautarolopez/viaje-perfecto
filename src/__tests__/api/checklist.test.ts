import { apiHandler, sur_argentino_id } from "../config.test"
import * as checklistHandler from '@/app/api/checklist/route';
import * as checklistIdHandler from '@/app/api/checklist/id/route';
const note_id = '001544b3-4001-4271-9855-fec4b6a6442e'

it("No se obtienen checklist al no mandar el trip_id", async () => {
    await apiHandler(checklistHandler, "GET", {}, async (response: any) => {
      const data = await response.json();
      const cant_notes = data.length
      
      expect(response.status).toBe(200);
      expect(cant_notes).toBe(0)
    })
});

it("Se obtienen 4 notas de una checklist al buscar las del viaje Sur argentino", async () => {
    await apiHandler(checklistHandler, "GET", {'trip_id': sur_argentino_id}, async (response: any) => {
      const data = await response.json();
      const cant_notes = data.length
      
      expect(response.status).toBe(200);
      expect(cant_notes).toBe(4)
    })
});

it("Se actualiza el estado de una nota", async () => {
  // Se verifica que si la nota está completada o no
  let is_checked: boolean;
  await apiHandler(checklistIdHandler, "GET", {'note_id': note_id}, async (response: any) => {
    const data = await response.json();
    is_checked = data.is_checked
    
    expect(response.status).toBe(200)
  })

  // Se actualiza el estado de la nota
  await apiHandler(checklistHandler, "PATCH", {'note_id': note_id}, async (response: any) => {
    const data = await response.json();
      
    expect(response.status).toBe(200)
    expect(data.message).toBe('Note updated')
  })

  // Se verifica que la nota cambió de estado
  await apiHandler(checklistIdHandler, "GET", {'note_id': note_id}, async (response: any) => {
    const data = await response.json();
      
    expect(response.status).toBe(200)
    expect(data.is_checked).toBe(!is_checked)
  })
})
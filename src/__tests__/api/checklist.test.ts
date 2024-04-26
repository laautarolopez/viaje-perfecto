const host = "http://localhost:3000"
const trip_id = '004544b2-4001-4271-9855-fec4b6a6442a'
const note_id = '001544b3-4001-4271-9855-fec4b6a6442e'

const fetchChecklist = async (method: string, trip_id?: string, note_id?: string, url?: string) => {
    const add_url = url ? url : ''

    const response = await fetch(`${host}/api/checklist${add_url}`, {
        method: method,
        headers: {
            ...(trip_id && {'trip_id': trip_id}),
            ...(note_id && {'note_id': note_id}),
        }
    })

    return response
}

test("Obtener checklist sin mandarle el trip_id", async () => {
    const response = await fetchChecklist("GET")
    const data = await response.json()
    const cant_notes = data.length
    
    expect(response.status).toBe(200)
    expect(cant_notes).toBe(0)
})

test("Obtener checklist de un vuelo", async () => {
    const response = await fetchChecklist("GET", trip_id)
    const data = await response.json()
    const cant_notes = data.length
    
    expect(response.status).toBe(200)
    expect(cant_notes).toBe(4)
})

test("Marcar una nota como completada", async () => {
    const response = await fetchChecklist("GET", undefined, note_id, '/id')
    const data = await response.json()
    const is_checked = data.is_checked
    expect(response.status).toBe(200)

    const updateResponse = await fetchChecklist("PATCH", undefined, note_id)
    const updateData = await updateResponse.json()
    expect(updateResponse.status).toBe(200)
    expect(updateData.message).toBe('Note updated')

    const getUpdatedResponse = await fetchChecklist("GET", undefined, note_id, '/id')
    const getUpdatedData = await getUpdatedResponse.json()
    expect(getUpdatedResponse.status).toBe(200)
    expect(getUpdatedData.is_checked).toBe(!is_checked)
})
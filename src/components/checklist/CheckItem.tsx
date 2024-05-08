import Checkbox from '@/components/checklist/Checkbox'
import { Note } from '@/app/lib/types'
import DeleteElement from '@/app/[id]/vuelos/components/DeleteElement'
import { deleteNote } from '@/app/actions/checklist'

const CheckItem = (note: Note) => {
  return (
    <div key={note.id} className="flex justify-between">
      <div className="flex gap-5">
        <Checkbox noteID={note.id} isChecked={note.is_checked} />
        <p className="font-bold">{note.description}</p>
      </div>
      <DeleteElement
        deleteElement={async () => {
          await deleteNote({ noteId: note.id })
        }}
      />
    </div>
  )
}

export default CheckItem

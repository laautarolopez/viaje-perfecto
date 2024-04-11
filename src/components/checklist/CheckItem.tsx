import Checkbox from '@/components/checklist/Checkbox'
import { Note } from '@/app/lib/types'

const CheckItem = (note: Note) => {
  return (
    <div key={note.id} className="flex gap-5">
      <Checkbox noteID={note.id} isChecked={note.is_checked} />
      <p className="font-bold">{note.description}</p>
    </div>
  )
}

export default CheckItem

import { Note } from '@/app/lib/types'
import Checkbox from '@/components/Checkbox'
import { fetchChecklist } from '@/app/actions/checklist'
import CheckItem from './CheckItem'
import Button from './Button'
import AddNoteButton from './AddNoteButton'

type CheckListProps = {
  tripId: string
}

const CheckList = async ({ tripId }: CheckListProps) => {
  const checklist = await fetchChecklist(tripId)

  return (
    <div className="flex flex-col mt-5 gap-5">
      {checklist.map((note: Note) => (
        <CheckItem key={note.id} {...note} />
      ))}
      <AddNoteButton />
    </div>
  )
}

export default CheckList

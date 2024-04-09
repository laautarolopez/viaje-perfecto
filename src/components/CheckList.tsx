import { fetchChecklist } from '@/app/lib/services/checklist'
import { Note } from '@/app/lib/types'
import Checkbox from '@/app/components/Checkbox'

type CheckListProps = {
  tripId: string
}

const CheckList = async ({ tripId }: CheckListProps) => {
  const checklist = await fetchChecklist(tripId)

  return (
    <div className="flex flex-col mt-5 gap-5">
      {checklist.map((note: Note) => (
        <div key={note.id} className="flex gap-5">
          <Checkbox is_checked={note.is_checked} />
          <p className="font-bold">{note.description}</p>
        </div>
      ))}
    </div>
  )
}

export default CheckList

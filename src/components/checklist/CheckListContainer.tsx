import { Note } from '@/app/lib/types'
import Checkbox from '@/components/checklist/Checkbox'
import { fetchChecklist } from '@/app/actions/checklist'
import CheckItem from './CheckItem'
import Button from '../Button'
import AddNoteButton from '../AddNoteButton'
import CheckList from './CheckList'

type CheckListContainerProps = {
  tripId: string
}

const CheckListContainer = async ({ tripId }: CheckListContainerProps) => {
  const checklist = await fetchChecklist(tripId)

  return <CheckList notes={checklist} tripId={tripId} />
}

export default CheckListContainer

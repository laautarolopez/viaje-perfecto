import { fetchChecklist } from '@/app/actions/checklist'
import CheckList from './CheckList'

type CheckListContainerProps = {
  tripId: string
}

const CheckListContainer = async ({ tripId }: CheckListContainerProps) => {
  const checklist = await fetchChecklist(tripId)

  return <CheckList notes={checklist} tripId={tripId} />
}

export default CheckListContainer

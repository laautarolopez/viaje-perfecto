import { SharedUserWithStatus } from '@/app/lib/types'
import DeleteElement from '../../vuelos/components/DeleteElement'
import { deleteSharedTrip } from '@/app/actions/shared_trips'

type SharedUserProps = {
  user: SharedUserWithStatus
}

const SharedUser = ({ user }: SharedUserProps) => (
  <li className="text-green-300 flex justify-between">
    <p>{user.email}</p>
    <DeleteElement
      deleteElement={async () => await deleteSharedTrip(user.sharedId)}
    />
  </li>
)

export default SharedUser

import {
  TripsInvitationsResponse,
  getTripsInvitations
} from '../actions/shared_trips'
import Invitation from './components/Invitation'

export default async function Notifications() {
  const tripsInvitations: TripsInvitationsResponse[] =
    await getTripsInvitations()

  return (
    <div className="py-10 px-5">
      <h1 className="text-4xl font-bold mb-5">Notificaciones</h1>
      {tripsInvitations.length === 0 ? (
        <p className="text-green-200">No tienes notificaciones pendientes</p>
      ) : (
        tripsInvitations.map((invitation) => (
          <Invitation invitation={invitation} key={invitation.sharedId} />
        ))
      )}
    </div>
  )
}

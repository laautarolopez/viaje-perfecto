import { getNotifications } from '../actions/notificationsQuerys'
import {
  NotificationsResponse,
  TripsInvitationsResponse,
  getTripsInvitations
} from '../actions/shared_trips'
import Invitation from './components/Invitation'
import VisualNotification from './components/VisualNotification'

export default async function Notifications() {
  const tripsInvitations: TripsInvitationsResponse[] =
    await getTripsInvitations()

  const notifications: NotificationsResponse[] = await getNotifications()

  return (
    <div className="py-10 px-5 grid gap-8">
      <h1 className="text-4xl font-bold mb-5">Notificaciones</h1>
      {tripsInvitations.length === 0 && notifications.length === 0 ? (
        <p className="text-green-200">No tienes notificaciones pendientes</p>
      ) : (
        <>
          {tripsInvitations.map((invitation) => (
            <Invitation invitation={invitation} key={invitation.sharedId} />
          ))}
          {notifications.map(({ id, title, message }) => (
            <VisualNotification
              id={id}
              title={title}
              message={message}
              key={id}
            />
          ))}
        </>
      )}
    </div>
  )
}

import Link from 'next/link'
import { FaMailBulk } from 'react-icons/fa'
import cx from 'classnames'
import { hasNotifications as hasNotificationsAction } from '@/app/actions/shared_trips'

const NotificationsLink = async () => {
  const hasNotifications = await hasNotificationsAction()
  return (
    <Link
      href="/notifications"
      className={cx(
        'flex justify-center items-center rounded-full h-12 w-12 hover:cursor-pointer hover:bg-cyan-800 transition-all',
        {
          'text-green-300': hasNotifications
        }
      )}
    >
      <FaMailBulk className="w-7 h-7" />{' '}
    </Link>
  )
}

export default NotificationsLink

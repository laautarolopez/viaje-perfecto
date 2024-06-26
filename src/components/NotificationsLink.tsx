import Link from 'next/link'
import { MdNotifications, MdNotificationImportant } from 'react-icons/md'
import { hasNotifications as hasNotificationsAction } from '@/app/actions/shared_trips'
import cx from 'classnames'

const NotificationsLink = async () => {
  const hasNotifications = await hasNotificationsAction()
  return (
    <Link
      href="/notifications"
      className={cx('flex justify-center items-center rounded-full h-12 w-12 hover:cursor-pointer hover:bg-cyan-800 transition-all',
      {'text-green-300': hasNotifications}
      )}
    >
      {hasNotifications ? <MdNotificationImportant className="w-7 h-7" /> : <MdNotifications className="w-7 h-7" />}
    </Link>
  )
}

export default NotificationsLink

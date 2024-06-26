import { FaHome, FaListUl, FaPlus, FaMailBulk } from 'react-icons/fa'
import Link from 'next/link'
import LogOutModal from './LogOutModal'
import NotificationsLink from './NotificationsLink'
import { profile } from '@/app/actions/auth'

const Footer = async () => {
  const user = await profile()

  return (
    <footer className="fixed bottom-0 bg-cyan-900 h-20 w-full flex flex-row justify-center items-center gap-14">
      <NotificationsLink />
      <Link
        href="/"
        className="flex justify-center items-center rounded-full h-12 w-12 hover:cursor-pointer hover:bg-cyan-800 transition-all"
      >
        <FaHome className="w-7 h-7" />
      </Link>
      <LogOutModal email={user.email}/>
      {/* <Link href='/' className='flex justify-center items-center rounded-full h-14 w-14 hover:cursor-pointer bg-green-300 text-cyan-900 hover:scale-110 transition-all'>
                <FaPlus className='w-7 h-7' />
            </Link> */}
      {/* <Link
        href="/"
        className="flex justify-center items-center rounded-full h-12 w-12 hover:cursor-pointer hover:bg-cyan-800 transition-all"
      >
        <FaListUl className="w-6 h-6" />
      </Link> */}
    </footer>
  )
}

export default Footer

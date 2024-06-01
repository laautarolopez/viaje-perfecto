import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import cx from 'classnames'
import Footer from '@/components/Footer'
import { cookies } from 'next/headers'
import Notifications from '@/components/Notifications'
import NotificationButton from '@/components/NotificationButton'
import NotificationListener from '@/components/NotificationListener'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Viaje perfecto',
  description: 'Tu app de viajes'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user_id = cookies().get('user_id')?.value

  return (
    <html lang="en">
      <body
        id="modals-root"
        className={cx(inter.className, 'bg-gray-700 text-white mb-20')}
      >
        <Notifications />
        {user_id && <NotificationListener user_id={user_id} />}
        <NotificationButton />
        {children}
        {user_id && <Footer />}
      </body>
    </html>
  )
}

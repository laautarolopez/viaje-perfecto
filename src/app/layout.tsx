import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import cx from 'classnames'
import Footer from '@/components/Footer'

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
  return (
    <html lang="en">
      <body
        id="modals-root"
        className={cx(inter.className, 'bg-gray-700 text-white mb-20')}
      >
        {children}
        <Footer />
      </body>
    </html>
  )
}

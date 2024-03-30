import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import cx from 'classnames'

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
      <body className={cx(inter.className, 'bg-gray-700 text-white')}>
        {children}
      </body>
    </html>
  )
}

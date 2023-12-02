import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import { NextSessionProvider } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bookstore',
  description: 'A simple bookstore',
}

type Props = {
  readonly children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextSessionProvider>
          {children}
          <ToastContainer position="top-right" />
        </NextSessionProvider>
      </body>
    </html>
  )
}

'use client'

import NextLink from 'next/link'

import { Link } from '@/components/client-side'
import { frontend } from '@/libs/navigation'

export const Footer = () => {
  return (
    <footer className="border-t-2 border-slate-100 bg-slate-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <NextLink href="#" className="text-xl font-bold hover:text-gray-700">
          BookStore
        </NextLink>
        <Link href={frontend.dashboard.home()}>Painel administrativo</Link>
      </div>
    </footer>
  )
}

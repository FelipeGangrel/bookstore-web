'use client'

import { Book } from '@phosphor-icons/react'
import NextLink from 'next/link'

import { UserWidget } from './UserWidget'

export const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 w-full bg-white/90 text-black shadow-md backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4 md:h-20">
        <NextLink href="/admin" className="flex gap-2 hover:text-slate-500">
          <Book size="24" weight="bold" />
          <span className="hidden font-extrabold md:flex">BookStore</span>
        </NextLink>

        <div className="ml-auto">
          <UserWidget />
        </div>
      </div>
    </div>
  )
}

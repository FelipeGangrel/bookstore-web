'use client'

import { Book, Heart, List, ShoppingCart } from '@phosphor-icons/react'
import Link from 'next/link'

import { SearchBar } from '@/components/client-side/SearchBar'

import { UserWidget } from './UserWidget'

export const Navbar = () => {
  return (
    <div className="fixed top-0 z-10 w-full bg-white text-black shadow-md">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex gap-2 px-4">
          <Book size="24" weight="bold" />
          <span className="font-extrabold">BookStore</span>
        </Link>
        <button className="flex gap-2">
          <List size="24" />
          <span>Categorias</span>
        </button>
        <SearchBar
          onChange={(e) => {
            console.log('You searched for ', e.target.value)
          }}
        />
        <button>
          <Heart size="24" />
          <span className="sr-only">Favorites</span>
        </button>
        <UserWidget />
        <button className="relative">
          <ShoppingCart size="24" />
          <span className="sr-only">Shopping cart</span>
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-300 text-xs text-black">
            3
          </span>
        </button>
      </div>
    </div>
  )
}

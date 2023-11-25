import { Book, Heart, List, ShoppingCart, User } from '@phosphor-icons/react'
import Link from 'next/link'

import { SearchBar } from '../../SearchBar'

export const StorefrontNavbar = () => {
  return (
    <div className="fixed top-0 z-10 w-full bg-white shadow-sm">
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
            console.log(e.target.value)
          }}
        />
        <button>
          <Heart size="24" />
        </button>
        <button>
          <User size="24" />
        </button>
        <button className="relative">
          <ShoppingCart size="24" />
          <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </div>
        </button>
      </div>
    </div>
  )
}

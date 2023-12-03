'use client'

import {
  Book,
  Heart,
  List,
  MagnifyingGlass,
  ShoppingCart,
} from '@phosphor-icons/react'
import NextLink from 'next/link'

import { SearchBar } from '@/components/client-side/SearchBar'
import { frontend } from '@/libs/navigation'

import { UserWidget } from './UserWidget'

export const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 w-full bg-white text-black shadow backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4 md:h-20">
        <NextLink
          href={frontend.storefront.home()}
          className="flex gap-2 hover:text-slate-500"
        >
          <Book size="24" weight="bold" />
          <span className="hidden font-extrabold md:flex">BookStore</span>
        </NextLink>
        <button className="flex gap-2 hover:text-slate-500">
          <List size="24" />
          <span>Categorias</span>
        </button>
        <div className="hidden flex-1 md:flex">
          <SearchBar
            onChange={(e) => {
              console.log('You searched for ', e.target.value)
            }}
          />
        </div>
        <button className="ml-auto hover:text-slate-500 md:hidden">
          <MagnifyingGlass size="24" />
          <span className="sr-only">Favorites</span>
        </button>
        <button className="hover:text-slate-500">
          <Heart size="24" />
          <span className="sr-only">Favorites</span>
        </button>
        <UserWidget />
        <button className="relative hover:text-slate-500">
          <ShoppingCart size="24" />
          <span className="sr-only">Shopping cart</span>
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-300 text-xs text-black">
            3
          </span>
        </button>
      </div>
    </div>
  )
}

import { SearchBar } from "../SearchBar";
import { Book, Heart, User, ShoppingCart, List } from "@phosphor-icons/react";
import Link from "next/link";

export const StorefrontNavbar = () => {
  return (
    <div className="bg-white shadow-sm fixed top-0 w-full z-10">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center h-20 gap-4">
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
            console.log(e.target.value);
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
          <div className="bg-red-500 h-5 w-5 flex items-center justify-center rounded-full text-xs text-white -top-2 absolute -right-2">
            3
          </div>
        </button>
      </div>
    </div>
  );
};

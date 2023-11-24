import { SearchBar } from "../SearchBar";
import { Heart, User, ShoppingCart, List } from "@phosphor-icons/react";

export const StorefrontNavbar = () => {
  return (
    <div className="bg-white shadow-sm sticky top-0">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center h-20 gap-4">
        <button className="w-36">logo here</button>
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
        <button>
          <ShoppingCart size="24" />
        </button>
      </div>
    </div>
  );
};

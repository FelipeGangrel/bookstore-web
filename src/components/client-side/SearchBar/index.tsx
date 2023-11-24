import { cn } from "@/libs/styles";
import { debounce } from "lodash";
import type { ChangeEvent, FC, InputHTMLAttributes } from "react";
import { useCallback, useRef, useState } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const SearchBar: FC<Props> = ({ className, onChange, ...props }) => {
  const [search, setSearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearch = useCallback(() => {
    setSearch("");
    inputRef?.current?.focus();
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    },
    [onChange]
  );

  const handleDebouncedChange = debounce(handleChange, 500);

  return (
    <div className="relative w-full flex flex-row items-center">
      <input
        {...props}
        ref={inputRef}
        type="text"
        className={cn(
          "border border-slate-200 bg-gray-50 rounded-md pl-4 pr-10 py-2 w-full outline-none focus:ring-2 focus:ring-slate-300",
          className
        )}
        onChange={(e) => {
          handleDebouncedChange(e);
          setSearch(e.target.value);
        }}
        value={search}
      />
      <button
        type="button"
        className="absolute right-4"
        onClick={() => {
          search && clearSearch();
        }}
      >
        {search ? <X /> : <MagnifyingGlass />}
      </button>
    </div>
  );
};

import type { FC, HTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/libs/styles";

const buttonClasses = tv({
  base: "font-medium bg-blue-500 text-white rounded-full active:opacity-80",
  variants: {
    variant: {
      primary: "bg-yellow-500 text-black",
      danger: "bg-red-500 text-white",
      light: "bg-white text-black",
      dark: "bg-black text-white",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "px-4 py-3 text-lg",
    },
  },
  compoundVariants: [
    {
      size: ["sm", "md"],
      class: "px-3 py-1",
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

type Props = HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger" | "light" | "dark";
  size?: "sm" | "md" | "lg";
};

export const Button: FC<Props> = ({
  children,
  className,
  size,
  variant,
  ...props
}) => {
  return (
    <button
      type="button"
      {...props}
      className={cn(buttonClasses({ size, variant }), className)}
    >
      {children}
    </button>
  );
};

import { StorefrontNavbar } from "@/components/client-side";

type Props = {
  readonly children: React.ReactNode;
};

export default function StoreFrontLayout({ children }: Props) {
  return (
    <>
      <StorefrontNavbar />
      {children}
    </>
  );
}

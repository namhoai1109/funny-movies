import Image from "next/image";
import tvIcon from "@/assets/images/television.png";
import Link from "next/link";
import NavbarItems from "./NavbarItems";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 border-b-2 border-black h-[48px] min-[440px]:h-[60px] flex-center bg-white custom-text">
      <div className="w-[1024px] px-4 lg:px-0 flex items-center justify-between">
        <Link href="/" className="flex-center gap-x-2">
          <Image
            src={tvIcon}
            alt="Television Icon"
            className="size-10 -translate-y-1"
          />
          <h1 className="text-2xl lg:text-3xl font-bold sm:block hidden">
            Funny Movies
          </h1>
        </Link>
        <NavbarItems />
      </div>
    </nav>
  );
}

export default Navbar;

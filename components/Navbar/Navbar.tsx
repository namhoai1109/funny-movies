import Image from "next/image";
import NavbarItems from "./components/NavbarItems";
import tvIcon from "@/assets/images/television.png";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 border-b-2 border-black h-[60px] flex-center">
      <div className="w-[1024px] flex items-center justify-between">
        <div className="flex-center gap-x-2">
          <Image
            src={tvIcon}
            alt="Television Icon"
            className="size-10 -translate-y-1"
          />
          <h1 className="text-3xl font-bold">Funny Movies</h1>
        </div>
        <NavbarItems />
      </div>
    </nav>
  );
}

export default Navbar;

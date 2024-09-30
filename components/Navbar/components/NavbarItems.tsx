"use client";
import { useGetMe } from "@/services/me/services";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavbarItems() {
  const { data, refetch } = useGetMe();
  const pathName = usePathname();
  const isSharePage = pathName === "/share";
  const isAuthenticated = data !== undefined && data.data.id !== 0;

  if (isAuthenticated) {
    const user = data.data;
    return (
      <div className="flex-center">
        <span className="mr-4">Welcome {user.email} !</span>
        <Link href={isSharePage ? "/" : "/share"}>
          <button className="button-md border-2 border-black custom-shadow">
            {isSharePage ? "Home" : "Share"}
          </button>
        </Link>
        <div className="h-8 w-0.5 bg-neutral-400 rounded-full ml-5" />
        <button
          className="button-md"
          onClick={() => {
            localStorage.removeItem("accessToken");
            refetch();
          }}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex-center gap-x-2">
      <Link href="/login">
        <button className="button-md">Login</button>
      </Link>
      <Link href="/register">
        <button className="button-md border-2 border-black custom-shadow">
          Register
        </button>
      </Link>
    </div>
  );
}

export default NavbarItems;

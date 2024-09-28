"use client";
import { useGetMe } from "@/services/me/services";
import Link from "next/link";

function NavbarItems() {
  const { data, refetch } = useGetMe();
  const isAuthenticated = data !== undefined && data.data.id !== 0;

  if (isAuthenticated) {
    const user = data.data;
    return (
      <div className="flex-center">
        <span className="mr-4">Welcome {user.email} !</span>
        <button className="button-md border-2 border-black custom-shadow">
          Share
        </button>
        <div className="h-8 w-0.5 bg-neutral-400 rounded-full ml-5" />
        <button
          className="transition-effect button-md"
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
        <button className="transition-effect button-md">Login</button>
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

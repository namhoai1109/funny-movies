"use client";
import { useGetMe } from "@/services/me/services";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const SERVER_NAME = process.env.NEXT_PUBLIC_SERVER_NAME;
const STAGE = process.env.NEXT_PUBLIC_STAGE;

function NavbarItems() {
  const { data, refetch } = useGetMe();
  const pathName = usePathname();
  const isSharePage = pathName === "/share";
  const isAuthenticated = data !== undefined && data.data.id !== 0;

  const ws = useMemo(() => {
    return new WebSocket(
      `${STAGE === "development" ? "ws" : "wss"}://${SERVER_NAME}/ws`
    );
  }, []);

  useEffect(() => {
    ws.onopen = () => {
      console.log("ws connected");
    };

    ws.onclose = () => {
      console.log("ws disconnected");
    };

    ws.onerror = (error) => {
      console.log("ws error", error);
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data) as TWsMessage;
      if (
        data === undefined ||
        data.data.id === 0 ||
        data.data.email === msg.email_sender
      ) {
        return;
      }

      toast.success(
        () => {
          return (
            <div className="custom-text">
              <h4 className="font-bold line-clamp-2">{msg.video_title}</h4>
              <p className="text-sm">
                shared by{" "}
                <span className="font-semibold">{msg.email_sender}</span>
              </p>
            </div>
          );
        },
        {
          duration: 3000,
          position: "top-right",
          style: {
            border: "2px solid #1a1a1a",
            boxShadow: "4px 4px 0px #1a1a1a",
            backgroundColor: "#fcfcfc",
          },
          icon: "🎬",
        }
      );
    };
  }, [ws, data]);

  if (isAuthenticated) {
    const user = data.data;
    return (
      <div className="flex-center">
        <span className="mr-2 md:mr-4">
          <span className="sm:inline hidden">Welcome</span> {user.email}{" "}
          <span className="sm:inline hidden">!</span>
        </span>
        <Link href={isSharePage ? "/" : "/share"}>
          <button className="md:px-4 button border-2 border-black custom-shadow">
            {isSharePage ? "Home" : "Share"}
          </button>
        </Link>
        <div className="h-8 w-0.5 bg-neutral-400 rounded-full ml-4 md:ml-5" />
        <button
          className="md:px-4 button"
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
        <button className="md:px-4 button">Login</button>
      </Link>
      <Link href="/register">
        <button className="md:px-4 button border-2 border-black custom-shadow">
          Register
        </button>
      </Link>
    </div>
  );
}

export default NavbarItems;

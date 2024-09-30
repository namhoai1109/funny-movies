import img from "@/assets/images/video-tutorial.png";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./components/LoginForm";

function Login() {
  return (
    <main className="size-full flex-center">
      <div className="w-2/3 h-full flex-center border-r-2 border-black">
        <Image src={img} alt="Video Tutorial" className="w-2/3 object-cover" />
      </div>
      <div className="w-1/3 flex-center">
        <div className="w-2/3 flex flex-col items-center gap-y-4">
          <h1 className="text-3xl font-bold">Login</h1>
          <LoginForm />
          <p className="text-sm text-neutral-400">
            Don&apos;t you have an account?
            <Link
              href="/register"
              className="ml-1 text-base font-semibold text-black"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;

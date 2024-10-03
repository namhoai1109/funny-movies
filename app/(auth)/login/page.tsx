import img from "@/assets/images/video-tutorial.png";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./components/LoginForm";

function Login() {
  return (
    <main className="size-full flex-center">
      <div className="lg:flex justify-center items-center hidden w-2/3 h-full border-r-2 border-black">
        <Image src={img} alt="Video Tutorial" className="w-2/3 object-cover" />
      </div>
      <div className="lg:w-1/3 w-[320px] px-2 flex-center">
        <div className="w-full lg:max-w-[360px] flex flex-col items-center gap-y-3 sm:gap-y-4">
          <h1 className="text-lg min-[440px]:text-2xl lg:text-3xl font-bold">
            Login
          </h1>
          <LoginForm />
          <p className="text-[10px] min-[440px]:text-xs sm:text-sm text-neutral-400">
            Don&apos;t you have an account?
            <Link
              href="/register"
              className="ml-1 custom-text font-semibold text-black"
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

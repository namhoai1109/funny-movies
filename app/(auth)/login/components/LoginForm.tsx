"use client";

import { useLogin } from "@/services/authen/services";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { mutate, isLoading } = useLogin();
  const router = useRouter();

  const onLogin = () => {
    if (credentials.email === "" || credentials.password === "") {
      toast.error(
        <span className="custom-text">Please input email and password</span>
      );
      return;
    }

    mutate(credentials, {
      onSuccess: (res) => {
        localStorage.setItem(
          "accessToken",
          res.data.token_type + " " + res.data.access_token
        );
        router.push("/");
      },
    });
  };

  return (
    <Fragment>
      <input
        className="input-border w-full rounded-md p-2 custom-text"
        placeholder="input your email"
        type="text"
        value={credentials.email}
        onChange={(event) => {
          setCredentials({
            ...credentials,
            email: event.target.value,
          });
        }}
      />
      <input
        className="input-border w-full rounded-md p-2 custom-text"
        placeholder="input your password"
        type="password"
        value={credentials.password}
        onChange={(event) => {
          setCredentials({
            ...credentials,
            password: event.target.value,
          });
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onLogin();
          }
        }}
      />
      <button
        className="button md:px-4 border-2 border-black custom-shadow flex-center gap-x-2 custom-text"
        onClick={() => {
          onLogin();
        }}
      >
        Login
        {isLoading && <span className="loader sm:size-4 size-3" />}
      </button>
    </Fragment>
  );
}

export default LoginForm;

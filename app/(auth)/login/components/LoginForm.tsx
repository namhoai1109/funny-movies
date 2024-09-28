"use client";

import { useLogin } from "@/services/authen/services";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { mutate } = useLogin();
  const router = useRouter();

  const onLogin = () => {
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
    <>
      <input
        className="input-border w-full rounded-md p-2"
        placeholder="input email"
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
        className="input-border w-full rounded-md p-2"
        placeholder="input password"
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
        className="button-md border-2 border-black custom-shadow"
        onClick={() => {
          onLogin();
        }}
      >
        Login
      </button>
    </>
  );
}

export default LoginForm;

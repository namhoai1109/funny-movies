"use client";
import { useRegister } from "@/services/authen/services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function RegisterForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { mutate } = useRegister();
  const router = useRouter();

  const onRegister = () => {
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
        type="text"
        value={credentials.password}
        onChange={(event) => {
          setCredentials({
            ...credentials,
            password: event.target.value,
          });
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onRegister();
          }
        }}
      />
      <button
        className="button-md border-2 border-black custom-shadow"
        onClick={() => {
          if (!credentials.email || !credentials.password) {
            toast.error("Please fill in all the fields");
            return;
          }

          onRegister();
        }}
      >
        Register
      </button>
    </>
  );
}

export default RegisterForm;

"use client";

import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleClick = async () => {
    console.log(process.env.NEXT_PUBLIC_BASE_API_URL);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/login`,
        {
          email,
          password,
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MaxWidthWrapper>
        <div className="w-full max-w-md text-white">
          <h1 className="font-bold text-5xl mb-4">Hi there,</h1>
          <p className="text-2xl mb-8">Welcome to our contacts portal</p>
          <div className="flex flex-col gap-4 text-black">
            <input
              className="rounded-full px-4 py-2 w-full text-black mb-2"
              value={email}
              onChange={handleEmail}
              placeholder="email"
            />
            <input
              className="rounded-full px-4 py-2 w-full text-black mb-8"
              value={password}
              onChange={handlePassword}
              placeholder="password"
            />
          </div>
          <div className="space-x-4 flex items-center">
            <button
              onClick={handleClick}
              className=" border-white border-2 rounded-full px-6 py-2 "
            >
              Login
            </button>
            <p>or</p>
            <p className="underline">Click here to Register</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}

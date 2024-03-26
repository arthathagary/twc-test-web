"use client";

import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface LoginFormProps {
  isBtnClicked: boolean;
  setIsBtnClicked: (value: boolean) => void;
}
export default function Loginform({
  isBtnClicked,
  setIsBtnClicked,
}: LoginFormProps) {
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
        <div className="w-full max-w-[477px] text-white">
          <h1 className="font-bold text-heading mb-2">Hi there,</h1>
          <p className="text-para mb-8 max-w-[253px] leading-10">
            Welcome to our contacts portal
          </p>
          <div className="flex flex-col gap-4 text-black">
            <input
              className="rounded-full  h-[55px] px-4 py-2 w-full text-black mb-4"
              value={email}
              onChange={handleEmail}
              placeholder="email"
            />
            <input
              className="rounded-full  h-[55px] px-4 py-2 w-full text-black mb-8"
              value={password}
              onChange={handlePassword}
              placeholder="password"
            />
          </div>
          <div className="space-x-4 flex items-center text-btnTxt">
            <button
              onClick={handleClick}
              className=" border-white  border-2 rounded-full px-6 py-2 "
            >
              login
            </button>
            <p>or</p>
            <p
              className="underline"
              onClick={() => {
                setIsBtnClicked(true);
              }}
            >
              Click here to Register
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}

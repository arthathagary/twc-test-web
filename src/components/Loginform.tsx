"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Spinner from "./Spinner";

interface LoginFormProps {
  isBtnClicked: boolean;
  setIsBtnClicked: (value: boolean) => void;
}
export default function Loginform({
  isBtnClicked,
  setIsBtnClicked,
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchErrors, setFetchErrors] = useState<null | string>(null);

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

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (error) {
      if ((error as AxiosError).response) {
        const errorCode = (error as AxiosError).response?.status;
        if (errorCode === 400) {
          setFetchErrors("Invalid email or password.");
        } else {
          setFetchErrors("Some Errors Occured");
        }
      } else {
        // Handle other cases (no response, etc.)
        console.log(error);
        setFetchErrors("Some Errors Occured");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MaxWidthWrapper>
        <form onSubmit={handleClick}>
          <div className="w-full max-w-[477px] text-white">
            <h1 className="font-bold text-heading mb-2">Hi there,</h1>
            <p className="text-para mb-8 max-w-[253px] leading-10">
              Welcome to our contacts portal
            </p>
            <div className="flex flex-col gap-4 text-black">
              <input
                type="email"
                className="rounded-full  h-[55px] px-4 py-2 w-full text-black mb-4"
                value={email}
                onChange={handleEmail}
                placeholder="email"
                required
              />
              <input
                type="password"
                className="rounded-full  h-[55px] px-4 py-2 w-full text-black mb-12"
                value={password}
                onChange={handlePassword}
                placeholder="password"
                required
              />
            </div>
            <div className="space-x-4 flex items-center text-btnTxt">
              <button
                aria-disabled={isLoading}
                type="submit"
                className=" border-white  border-2 rounded-full px-6 py-2 flex items-center gap-3"
              >
                login {isLoading && <Spinner />}
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
            {fetchErrors && <p className="text-red-500 mt-4">{fetchErrors}</p>}
          </div>
        </form>
      </MaxWidthWrapper>
    </>
  );
}

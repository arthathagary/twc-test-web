"use client";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

interface RegisterFormProps {
  isBtnClicked: boolean;
  setIsBtnClicked: (value: boolean) => void;
}

export default function Registerform({
  isBtnClicked,
  setIsBtnClicked,
}: RegisterFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [trackError, setTrackError] = useState(false);

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

  const handleConfirmPassword: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setconfirmPassword(e.target.value);
  };

  const handleClick = async () => {
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (email.trim() === "") {
      newErrors.email = "Email is required";
      setTrackError(true);
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required";
      setTrackError(true);
    }
    if (confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm Password is required";
      setTrackError(true);
    }

    setErrors({ email: "", password: "", confirmPassword: "" }); // Clear any previous errors

    // Check if any errors exist
    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      setTrackError(true);
      return; // Don't make the API call if there are errors
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setTrackError(true);
      return; // Exit the function if there's a mismatch
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/register`,
        {
          email,
          password,
        }
      );

      setIsBtnClicked(false);
    } catch (error) {
      if ((error as AxiosError).response) {
        const errorCode = (error as AxiosError).response?.status;
        if (errorCode === 400 || errorCode === 401) {
          setFetchErrors(
            "Email already exists try different email or login instead"
          );
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
    <MaxWidthWrapper>
      <div className="w-full max-w-[477px] text-white">
        <h1 className="font-bold text-heading mb-8">Register Now!</h1>
        <div className="flex flex-col gap-4 text-black">
          <input
            className={`rounded-full h-[55px] px-4 py-2 w-full text-black ${
              !trackError ? "mb-4" : "mb-0"
            }`}
            value={email}
            onChange={handleEmail}
            placeholder="email"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            type="password"
            className={`rounded-full h-[55px] px-4 py-2 w-full text-black ${
              !trackError ? "mb-4" : "mb-0"
            }`}
            value={password}
            onChange={handlePassword}
            placeholder="create password"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <input
            type="password"
            className={`rounded-full h-[55px] px-4 py-2 w-full text-black ${
              !trackError ? "mb-12" : "mb-0"
            }`}
            value={confirmPassword}
            onChange={handleConfirmPassword}
            placeholder="confirm password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}

          {passwordError && (
            <p className="text-red-500 mb-8">{passwordError}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-8">
          <button
            onClick={handleClick}
            className={`${
              fetchErrors ? "mb-0" : "mb-12"
            } text-btnTxt border-white border-2 rounded-full px-6 py-2 flex items-center gap-3`}
          >
            Register {isLoading && <Spinner />}
          </button>
          {fetchErrors && <p className="text-red-500 mb-8">{fetchErrors}</p>}

          <button
            className="text-btnTxt"
            onClick={() => {
              setIsBtnClicked(false);
            }}
          >
            <div className="flex items-center gap-2 underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>{" "}
              Back to login
            </div>
          </button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

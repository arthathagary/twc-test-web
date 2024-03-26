"use client";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import axios from "axios";

interface RegisterFormProps {
  isBtnClicked: boolean;
  setIsBtnClicked: (value: boolean) => void;
}

export default function Registerform({
  isBtnClicked,
  setIsBtnClicked,
}: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return; // Exit the function if there's a mismatch
    }
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required";
    }
    if (confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    // Check if any errors exist
    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return; // Don't make the API call if there are errors
    }

    // If we reach here, no empty field errors
    setErrors({ email: "", password: "", confirmPassword: "" }); // Clear any previous errors
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/register`,
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
    <MaxWidthWrapper>
      <div className="w-full max-w-[477px] text-white">
        <h1 className="font-bold text-heading mb-8">Register Now!</h1>
        <div className="flex flex-col gap-4 text-black">
          <input
            className="rounded-full h-[55px] px-4 py-2 w-full text-black mb-4"
            value={email}
            onChange={handleEmail}
            placeholder="email"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            className="rounded-full h-[55px] px-4 py-2 w-full text-black mb-4"
            value={password}
            onChange={handlePassword}
            placeholder="create password"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <input
            className="rounded-full h-[55px] px-4 py-2 w-full text-black mb-8"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            placeholder="confirm password"
          />

          {passwordError && (
            <p className="text-red-500 mb-8">{passwordError}</p>
          )}

          {errors.confirmPassword && (
            <p className="text-red-500 mb-8">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-8">
          <button
            onClick={handleClick}
            className="text-btnTxt border-white border-2 rounded-full px-6 py-2 "
          >
            Register
          </button>
          <p
            className="text-btnTxt"
            onClick={() => {
              setIsBtnClicked(false);
            }}
          >
            Back to login
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

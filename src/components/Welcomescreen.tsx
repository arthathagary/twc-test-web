"use client";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import ContactsPortal from "./ContactsPortal";
import Logo from "./Logo";
import Logout from "./Logout";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Spinner from "./Spinner";

export default function Welcomescreen() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decode = jwt.decode(token);
      if (!decode) {
        redirect("/login");
      } else {
        setIsAuth(true);
      }
    } else {
      redirect("/login");
    }
  }, []);

  if (!isAuth) {
    return (
      <div className="flex justify-center items-center h-screen z-50">
        <Spinner color="#093F46" />
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-bg-primary rounded-tr-[200px] rounded-bl-[200px] relative">
      <MaxWidthWrapper>
        <Logo className="pt-[72px]" />
        <ContactsPortal />
        <div className="flex flex-col justify-center">
          <h1 className="text-heading font-bold text-white mt-8">Welcome,</h1>
          <p className="text-para text-white mt-4 max-w-[951px] mb-8">
            This is where your contacts will live. Click the button below to add
            a new contact.
          </p>
          <div>
            <Link passHref href="/contacts/new">
              <button className="text-btnTxt border-2 border-white rounded-full px-6 py-2 mt-8 text-white">
                add your first contact
              </button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
      <Logout />
    </div>
  );
}

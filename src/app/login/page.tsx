"use client";
import ContactsPortal from "@/components/ContactsPortal";
import Loginform from "@/components/Loginform";
import Logo from "@/components/Logo";
import Registerform from "@/components/Registerform";
import { useState } from "react";

export default function AuthPage() {
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  return (
    <div className="grid grid-cols-5 min-h-screen">
      <div className="col-span-3 circle">
        <div className="flex justify-center items-center min-h-screen">
          {!isBtnClicked && (
            <Loginform
              isBtnClicked={isBtnClicked}
              setIsBtnClicked={setIsBtnClicked}
            />
          )}
          {isBtnClicked && (
            <Registerform
              isBtnClicked={isBtnClicked}
              setIsBtnClicked={setIsBtnClicked}
            />
          )}
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex flex-col justify-center items-start min-h-screen">
          <Logo color="black" className="mb-3" />
          <ContactsPortal color="black" />
        </div>
      </div>
    </div>
  );
}

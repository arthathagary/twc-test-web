import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Logo from "./Logo";
import ContactsPortal from "./ContactsPortal";

export default function Welcomescreen() {
  return (
    <div className=" min-h-screen bg-bg-primary rounded-tr-[200px] rounded-bl-[200px]">
      <MaxWidthWrapper>
        <Logo className="pt-[72px]" />
        <ContactsPortal />
        <div className="flex flex-col justify-center">
          <h1 className="text-heading font-bold text-white mt-8">Welcome,</h1>
          <p className="text-para text-white mt-4">
            This is where your contacts will live. Click the button below to add
            a new contact.
          </p>
          <div>
            <button className="text-btnTxt border-2 border-white rounded-full px-6 py-2 mt-8 text-white">
              add your first contact
            </button>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

"use client";
import ContactsPortal from "@/components/ContactsPortal";
import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

export default function Contacts() {
  const [contact, setContact] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });

  const handleName: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setContact({ ...contact, fullname: e.target.value });
  };

  const handleEmail: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setContact({ ...contact, email: e.target.value });
  };

  const handlePhoneNumber: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setContact({ ...contact, phoneNumber: e.target.value });
  };

  const handleGender: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setContact({ ...contact, gender: e.target.value });
  };

  const handleClick = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/contacts`,
        {
          fullname: contact.fullname,
          email: contact.email,
          phonenumber: contact.phoneNumber,
          gender: contact.gender,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" min-h-screen bg-bg-primary rounded-tr-[200px] rounded-bl-[200px] relative">
        <MaxWidthWrapper>
          <div className="flex  items-center justify-between pt-[72px]">
            <Logo className="" />
            <div>
              <button
                onClick={handleClick}
                className="text-btnTxt border-2 border-white rounded-full px-6 py-2 mt-8 text-white"
              >
                add your contact
              </button>
            </div>
          </div>

          <ContactsPortal />
          <div className="relative bg-white rounded-[30px] h-[316px] w-full">
            <div className="absolute left-4 top-4 overflow-y-auto h-[316px] w-full">
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
              <p>...</p>
            </div>
          </div>
        </MaxWidthWrapper>
        <button className="text-btnTxt flex items-center gap-4  text-white absolute bottom-10 right-20 underline">
          <div className="relative">
            <svg
              className="absolute right-4 top-2"
              width="26"
              height="15"
              viewBox="0 0 26 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.583344 7.50001L9.54168 14.6667V9.29168H25.6667V5.70834H9.54168V0.333344L0.583344 7.50001Z"
                fill="white"
              />
            </svg>
            <svg
              width="29"
              height="33"
              viewBox="0 0 29 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.2935 0.3732C10.1749 0.367326 8.07616 0.781898 6.11893 1.5929C4.16169 2.4039 2.38484 3.59522 0.891296 5.09783L3.42471 7.63124C5.7933 5.26266 8.94305 3.95653 12.2935 3.95653C15.6439 3.95653 18.7936 5.26266 21.1622 7.63124C23.5308 9.99982 24.8369 13.1496 24.8369 16.5C24.8369 19.8504 23.5308 23.0002 21.1622 25.3687C18.7936 27.7373 15.6439 29.0434 12.2935 29.0434C8.94305 29.0434 5.7933 27.7373 3.42471 25.3687L0.891296 27.9022C3.93534 30.948 7.98451 32.6268 12.2935 32.6268C16.6024 32.6268 20.6516 30.948 23.6956 27.9022C26.7415 24.8581 28.4203 20.809 28.4203 16.5C28.4203 12.191 26.7415 8.14187 23.6956 5.09783C22.2021 3.59522 20.4252 2.4039 18.468 1.5929C16.5108 0.781898 14.4121 0.367326 12.2935 0.3732Z"
                fill="white"
              />
            </svg>
          </div>
          logout
        </button>
      </div>
    </>
  );
}

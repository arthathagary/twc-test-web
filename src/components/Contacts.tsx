"use client";
import ContactsPortal from "@/components/ContactsPortal";
import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import EclipseMale from "@/public/assets/images/Ellipse_male.svg";
import Image from "next/image";

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
            <div className="absolute  top-8  overflow-y-auto h-[316px] w-full flex justify-center items-start">
              <table className="table-auto w-full text-left max-w-[920px]">
                <thead>
                  <tr>
                    <th></th>
                    <th>Full name</th>
                    <th>gender</th>
                    <th>email</th>
                    <th>phone number</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      <Image src={EclipseMale} alt="male-avatar" />
                    </td>
                    <td>Arthath Agary</td>
                    <td>male</td>
                    <td>agary@gmail.com</td>
                    <td>323433422</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <svg
                          width="23"
                          height="24"
                          viewBox="0 0 23 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.4958 8.925L14.4229 4.725L15.7646 3.325C16.1319 2.94167 16.5833 2.75 17.1187 2.75C17.6535 2.75 18.1045 2.94167 18.4719 3.325L19.8135 4.725C20.1809 5.10833 20.3726 5.571 20.3885 6.113C20.4045 6.65433 20.2288 7.11667 19.8615 7.5L18.4958 8.925ZM3.83333 21C3.56181 21 3.33436 20.904 3.151 20.712C2.967 20.5207 2.875 20.2833 2.875 20V17.175C2.875 17.0417 2.89896 16.9127 2.94688 16.788C2.99479 16.6627 3.06667 16.55 3.1625 16.45L13.0333 6.15L17.1063 10.4L7.23542 20.7C7.13958 20.8 7.03193 20.875 6.91246 20.925C6.79235 20.975 6.6684 21 6.54062 21H3.83333Z"
                            fill="#083F46"
                          />
                        </svg>

                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.58334 22.75C6.98751 22.75 6.47762 22.538 6.05368 22.1141C5.62901 21.6894 5.41668 21.1792 5.41668 20.5833V6.5H4.33334V4.33333H9.75001V3.25H16.25V4.33333H21.6667V6.5H20.5833V20.5833C20.5833 21.1792 20.3714 21.6894 19.9474 22.1141C19.5228 22.538 19.0125 22.75 18.4167 22.75H7.58334ZM18.4167 6.5H7.58334V20.5833H18.4167V6.5ZM9.75001 18.4167H11.9167V8.66667H9.75001V18.4167ZM14.0833 18.4167H16.25V8.66667H14.0833V18.4167Z"
                            fill="#083F46"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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

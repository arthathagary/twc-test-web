"use client";
import ContactsPortal from "@/components/ContactsPortal";
import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import useToken from "@/hooks/useToken";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import {
  ChangeEvent,
  ChangeEventHandler,
  use,
  useEffect,
  useState,
} from "react";
import Modal from "./Modal";
import Logout from "./Logout";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}
export default function NewContact() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");

  // const decode = jwt.decode(accessToken) as CustomJwtPayload;
  // if (decode && decode.id) {
  //   setUserId(decode.id);
  // } else {
  //   console.log("JWT error: token is invalid or missing 'id' claim");
  // }

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

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/contacts`,
        {
          fullname: contact.fullname,
          email: contact.email,
          phonenumber: contact.phoneNumber,
          gender: contact.gender,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAccessToken(token);
      const decode = jwt.decode(token) as CustomJwtPayload;
      if (decode && decode.id && decode.id !== userId) {
        setUserId(decode.id);
      } else if (!decode) {
        redirect("/login");
      } else {
        setIsAuth(true);
      }
    } else {
      redirect("/login");
    }
  }, [accessToken, userId]); // Dependency array

  if (!isAuth) {
    return (
      <div className="flex justify-center items-center h-screen z-50">
        Loading..
      </div>
    );
  }

  return (
    <>
      <div className=" min-h-screen bg-bg-primary rounded-tr-[200px] rounded-bl-[200px] relative">
        <form onSubmit={handleClick}>
          <MaxWidthWrapper>
            <Logo className="pt-[72px]" />
            <ContactsPortal />
            <div className="flex flex-col justify-center">
              <h1 className="text-heading font-bold text-white my-8">
                New Contact
              </h1>
              <div className="grid grid-cols-2 gap-6  items-center justify-center">
                <input
                  className="rounded-full h-[55px] px-4 py-2 w-full text-black mb-4"
                  value={contact.fullname}
                  onChange={handleName}
                  placeholder="full name"
                  required
                />
                <input
                  type="email"
                  className="rounded-full h-[55px] px-4 py-2 w-full text-black mb-4"
                  value={contact.email}
                  onChange={handleEmail}
                  placeholder="email"
                  required
                />
                <input
                  className="rounded-full h-[55px] px-4 py-2 w-full text-black mb-4"
                  value={contact.phoneNumber}
                  onChange={handlePhoneNumber}
                  placeholder="phone number"
                  required
                />
                <div className="h-[55px] text-white text-btnTxt space-x-10 flex">
                  <label>gender</label>
                  <div className="space-x-4">
                    <input
                      type="radio"
                      checked={contact.gender === "male"}
                      value="male"
                      name="gender"
                      onChange={handleGender}
                    />
                    <label>male</label>
                  </div>
                  <div className="space-x-4">
                    <input
                      type="radio"
                      checked={contact.gender === "female"}
                      value="female"
                      name="gender"
                      onChange={handleGender}
                      required
                    />
                    <label>female</label>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="text-btnTxt border-2 border-white rounded-full px-6 py-2 mt-8 text-white"
                >
                  add your first contact
                </button>
              </div>
            </div>
          </MaxWidthWrapper>
        </form>
        <Logout />
      </div>
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title="Your contact has been saved succesfully"
      >
        <button
          className="text-[28px] bg-bg-primary text-white px-5 py-[10px] rounded-full"
          onClick={() => router.push("/contacts")}
        >
          Okay
        </button>
      </Modal>
    </>
  );
}

"use client";
import ContactsPortal from "@/components/ContactsPortal";
import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import EclipseFemale from "@/public/assets/images/Ellipse_female.svg";
import EclipseMale from "@/public/assets/images/Ellipse_male.svg";
import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

import { IContactData } from "@/app/contacts/page";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import Logout from "./Logout";
import Modal from "./Modal";
import jwt from "jsonwebtoken";

interface ContactProps {
  data: IContactData[];
}

export default function Contacts({ data }: ContactProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [contactId, setContactId] = useState("");
  const [contactName, setContactName] = useState("");
  const [editBtnClicked, setEditBtnClicked] = useState(
    Array(data.length).fill(false)
  );
  const [accessToken, setAccessToken] = useState("");

  const [contact, setContact] = useState<IContactData>({
    fullname: "",
    email: "",
    phonenumber: "",
    gender: "",
  });

  const handleEditClick = (index: number) => {
    const updatedClicked = [...editBtnClicked];
    updatedClicked[index] = true;
    setEditBtnClicked(updatedClicked);
  };

  const handleName: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.value, "e.target.value");
    console.log(contact, "contact");
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
    setContact({ ...contact, phonenumber: e.target.value });
  };

  const handleGender: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setContact({ ...contact, gender: e.target.value });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/contacts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/contacts/${id}`,
        {
          fullname: contact.fullname,
          email: contact.email,
          phonenumber: contact.phonenumber,
          gender: contact.gender,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setEditBtnClicked(editBtnClicked.map(() => false));
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAccessToken(token);
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
        Loading..
      </div>
    );
  }

  return (
    <>
      <div className=" min-h-screen bg-bg-primary rounded-tr-[200px] rounded-bl-[200px] relative">
        <MaxWidthWrapper>
          <Logo className="pt-[72px]" />
          <ContactsPortal />
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-heading font-bold text-white mt-8">Contacts</h1>
            <div>
              <Link passHref href="/contacts/new">
                <button className="text-btnTxt border-2 border-white rounded-full px-6 py-2 mt-8 text-white">
                  add your contact
                </button>
              </Link>
            </div>
          </div>

          <div className="relative bg-white rounded-[30px] h-[316px] w-full">
            <div className="absolute  py-8  overflow-y-auto h-[316px] w-full flex justify-center items-start">
              <table className="table-auto w-full text-left max-w-[920px]">
                <thead>
                  <tr className="">
                    <th></th>
                    <th>Full name</th>
                    <th>gender</th>
                    <th>email</th>
                    <th>phone number</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((contactDetail, index) => (
                    <tr key={index}>
                      {!editBtnClicked[index] && (
                        <>
                          <td>
                            {contactDetail.gender === "male" ? (
                              <Image src={EclipseMale} alt="male-avatar" />
                            ) : (
                              <Image src={EclipseFemale} alt="female-avatar" />
                            )}
                          </td>
                          <td>{contactDetail.fullname}</td>
                          <td>{contactDetail.gender}</td>
                          <td>{contactDetail.email}</td>
                          <td>{contactDetail.phonenumber}</td>
                          <td>
                            <div className="flex items-center gap-4 cursor-pointer">
                              <svg
                                onClick={() => {
                                  handleEditClick(index);
                                  setContact(contactDetail);
                                }}
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
                                onClick={() => {
                                  setShowModal(true);
                                  setContactId(contactDetail._id!);
                                  setContactName(contactDetail.fullname);
                                }}
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
                        </>
                      )}

                      {editBtnClicked[index] && (
                        <>
                          <td>
                            {contactDetail.gender === "male" ? (
                              <Image src={EclipseMale} alt="male-avatar" />
                            ) : (
                              <Image src={EclipseFemale} alt="female-avatar" />
                            )}
                          </td>
                          <td>
                            <input
                              type="text"
                              className="bg-gray-300 px-2 py-1"
                              value={contact.fullname}
                              onChange={handleName}
                            />
                          </td>
                          <td>
                            <div className="">
                              <div className="bg-gray-300 px-2 justify-between py-1 mr-8 flex items-center">
                                {contact.gender}
                                <svg
                                  onClick={() => {
                                    setContact({
                                      ...contact,
                                      gender:
                                        contact.gender === "male"
                                          ? "female"
                                          : "male",
                                    });
                                  }}
                                  className=""
                                  width="21"
                                  height="21"
                                  viewBox="0 0 21 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g opacity="0.75">
                                    <path
                                      d="M17.5 11.375C17.286 12.9148 16.5717 14.3416 15.4671 15.4355C14.3624 16.5293 12.9288 17.2297 11.387 17.4287C9.84514 17.6276 8.28067 17.3141 6.93455 16.5364C5.58843 15.7588 4.53534 14.5601 3.9375 13.125M3.5 16.625V13.125H7M3.5 9.62501C3.71399 8.0852 4.42831 6.65847 5.53294 5.56457C6.63757 4.47068 8.07121 3.77032 9.61304 3.57137C11.1549 3.37243 12.7193 3.68594 14.0654 4.4636C15.4116 5.24127 16.4647 6.43996 17.0625 7.87501M17.5 4.37501V7.87501H14"
                                      stroke="#083F46"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="bg-gray-300 px-2 py-1 "
                              value={contact.email}
                              onChange={handleEmail}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="bg-gray-300 px-2 py-1"
                              value={contact.phonenumber}
                              onChange={handlePhoneNumber}
                            />
                          </td>
                          <div className="flex items-center justify-start mt-2">
                            <button
                              className="bg-bg-primary text-white px-5 py-2 rounded-full"
                              onClick={() => {
                                handleUpdate(contact._id!);
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </MaxWidthWrapper>
        <Logout />
      </div>
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={`Do you want to delete the contact “${contactName}”?`}
      >
        <div className="space-x-6">
          <button
            className="text-[28px] bg-bg-primary text-white px-8 py-[10px] rounded-full"
            onClick={() => handleDelete(contactId)}
          >
            Yes
          </button>
          <button
            className="text-[28px] bg-white border border-bg-primary text-black px-5 py-[10px] rounded-full"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        isVisible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Your contact has been deleted successfully!"
      >
        <button
          className="text-[28px] bg-bg-primary text-white px-5 py-[10px] rounded-full"
          onClick={() => router.refresh()}
        >
          Okay
        </button>
      </Modal>
    </>
  );
}

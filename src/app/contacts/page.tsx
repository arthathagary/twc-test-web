import Contacts from "@/components/Contacts";
import axios from "axios";
import React from "react";

export interface IContactData {
  _id?: string;
  fullname: string;
  email: string;
  phonenumber: string;
  gender: string;
}
const getContactData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/contacts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export default async function page() {
  const data = await getContactData();
  return (
    <>
      <Contacts data={data.contacts} />
    </>
  );
}

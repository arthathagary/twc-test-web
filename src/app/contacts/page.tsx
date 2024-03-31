import Contacts from "@/components/Contacts";
import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface IContactData {
  _id?: string;
  fullname: string;
  email: string;
  phonenumber: string;
  gender: string;
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
}
const getContactData = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return;
  }

  try {
    const decoded = jwt.decode(token!.value) as CustomJwtPayload;
    const userId = decoded.id;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/contacts/${userId}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        credentials: "include",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};

export default async function page() {
  const data = await getContactData();
  if (!data) {
    redirect("/login");
  }
  return (
    <>
      <Contacts data={data.contacts} />
    </>
  );
}

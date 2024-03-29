"use server";

import { cookies } from "next/headers";

export async function getCookie() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
}

import Image from "next/image";
import React from "react";
import ContactsPortalImg from "@/public/assets/images/contacts_portal.svg";
import ContactsPortalImgBlack from "@/public/assets/images/contacts_portal_black.svg";

interface ContactsPortalProps {
  color?: "black" | "white";
}

export default function ContactsPortal({ color }: ContactsPortalProps) {
  return (
    <div>
      {color === "black" ? (
        <Image src={ContactsPortalImgBlack} alt="ContactsPortal" />
      ) : (
        <Image
          src={ContactsPortalImg}
          alt="ContactsPortal"
          className="text-white"
        />
      )}
    </div>
  );
}

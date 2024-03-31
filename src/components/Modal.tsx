import { useRouter } from "next/navigation";
import React from "react";

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Popup({
  isVisible,
  onClose,
  title,
  children,
}: PopupProps) {
  const router = useRouter();
  if (!isVisible) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={() => onClose()}
    >
      <div className="w-[809px]">
        <div className="bg-white h-[215px] p-2 rounded-3xl justify-center items-center flex flex-col gap-[30px] ">
          <h3 className="text-[30px]">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
}

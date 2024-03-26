import TwcLogo from "@/public/assets/images/Logo.png";
import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image src={TwcLogo} alt="twc-logo" />
    </div>
  );
}

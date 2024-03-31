import TwcLogo from "@/public/assets/images/Logo.svg";
import TwcLogoBlack from "@/public/assets/images/LogoBlack.svg";

import Image from "next/image";

interface LogoProps {
  className?: string;
  color?: "black" | "white";
}

export default function Logo({ className, color }: LogoProps) {
  return (
    <div>
      {color === "black" ? (
        <Image src={TwcLogoBlack} alt="twc-logo" className={className} />
      ) : (
        <Image src={TwcLogo} alt="twc-logo" className={className} />
      )}
    </div>
  );
}

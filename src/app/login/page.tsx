import Loginform from "@/components/Loginform";
import Logo from "@/components/Logo";
import Registerform from "@/components/Registerform";

export default function page() {
  return (
    <div className="grid grid-cols-5 min-h-screen">
      <div className="col-span-3 circle">
        <div className="flex justify-center items-center min-h-screen">
          {/* <Loginform /> */}
          <Registerform />
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex justify-center items-center min-h-screen">
          <Logo />
        </div>
      </div>
    </div>
  );
}

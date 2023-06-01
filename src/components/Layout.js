import Navbar from "@/src/components/Navbar";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="flex bg-gray-800 justify-center items-center min-w-screen min-h-screen">
        <button
          onClick={() => signIn()}
          className="bg-white text-black py-3 px-5 rounded-tl-[10px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[10px]"
        >
          <b>Fazer Login</b>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="block md:hidden py-2 pl-2">
        <button onClick={() => setShowNav(true)}>
          <Bars3Icon className="w-6" />
        </button>
      </div>
      <div className="flex">
        <Navbar show={showNav} />
        <div className="bg-white flex-grow mt-0 mb-2 md:my-2 mr-2 rounded-lg ml-2 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

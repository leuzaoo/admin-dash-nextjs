import Navbar from "@/src/components/Navbar";

import { useSession, signIn } from "next-auth/react";

export default function Layout({ children }) {
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
    <div className="bg-slate-300 min-h-screen flex">
      <Navbar />
      <div className="bg-white flex-grow my-2 mr-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}

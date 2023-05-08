import Navbar from "@/src/components/Navbar";

import { useSession, signIn } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
   if (!session) {
    return (
      <div className="flex justify-center items-center min-w-screen min-h-screen">
        <button
          onClick={() => signIn()}
          className="bg-amber-200 p-2 px-4 rounded-lg w-full mr-16"
        >
          <b>Login</b>
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

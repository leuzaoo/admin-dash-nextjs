import Navbar from "@/src/components/Navbar";
import Input from "./Input";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-gray-400 w-screen h-screen flex items-center justify-center">
        <div className="w-[450px] bg-gray-300 rounded-xl text-center pt-8 pb-8">
          <h2 className="text-3xl font-bold">Faça seu Login</h2>
          <p className="px-20 pt-4 text-xl">
            Insira os detalhes da sua conta para realizar seu login.
          </p>
          <div className="mt-10 px-16 ">
            <Input
              type="text"
              title="Email*"
              placeholder="suacompanhia@hotmail.com"
            />
            <br />
            <Input type="password" title="Senha*" placeholder="********" />
          </div>

          <div className="px-16 text-left mt-4">
            <p className="text-sm">
              This information will be securely saved as per the{" "}
              <b>Terms of Service & Privacy Police</b>.
            </p>
          </div>

          <div className="mt-10 gap-4 flex justify-center">
            <button className="bg-white p- px-4 rounded-lg w-[200px] border-[1px] border-black ml-16">
              <b>Ajuda?</b>
            </button>
            <button
              onClick={() => signIn("google")}
              className="bg-amber-200 p-2 px-4 rounded-lg w-full mr-16"
            >
              <b>Login with Google</b>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-500 min-h-screen flex">
      <Navbar />
      <div className="bg-white flex-grow my-2 mr-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}

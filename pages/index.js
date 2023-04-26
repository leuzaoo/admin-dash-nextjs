import Navbar from "@/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-500 min-h-screen flex">
      <Navbar />
      <div className="bg-white flex-grow my-2 mr-2 rounded-lg p-4">
        logged in {session.user.email}
      </div>
    </div>
  );
}

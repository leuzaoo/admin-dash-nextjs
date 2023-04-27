import Layout from "@/src/components/Layout";
import Image from "next/image";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-black flex justify-between">
        <h2>
          Olá, <b>{session?.user?.name}.</b>
        </h2>

        <div>
          <Image
            className="w-20"
            src={session?.user?.image}
            alt="User picture"
            width={180}
            height={180}
            priority
          />
        </div>
      </div>
    </Layout>
  );
}
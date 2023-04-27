import Layout from "@/components/Layout";
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
            src={session?.user?.image}
            alt="User image."
            className="w-16 h-16"
            width={600}
            height={800}
          />
        </div>
      </div>
    </Layout>
  );
}

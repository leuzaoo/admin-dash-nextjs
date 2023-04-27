import Layout from "@/src/components/Layout";

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
          <img src={session?.user?.image} alt="User picture" />
        </div>
      </div>
    </Layout>
  );
}

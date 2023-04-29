import Layout from "@/src/components/Layout";
import Link from "next/link";

import { PlusSmallIcon } from "@heroicons/react/24/outline";

export default function Products() {
  return (
    <Layout>
      <div>
        <Link href={"/products/new-products"} className="flex items-center">
          <div className="bg-black flex px-4 py-2 text-white rounded-tr-[16px] rounded-tl-[8px] rounded-bl-[16px] rounded-br-[8px]">
            <span>Adicionar</span>
            <PlusSmallIcon className="w-6" />
          </div>
        </Link>
      </div>
    </Layout>
  );
}

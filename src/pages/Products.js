/* eslint-disable react/jsx-key */
import Layout from "@/src/components/Layout";
import Link from "next/link";
import axios from "axios";

import {
  PencilSquareIcon,
  PlusSmallIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <Layout>
      <div>
        <Link href={"/products/new"} className="flex items-center">
          <div className="bg-black flex px-4 py-2 text-white rounded-tr-[16px] rounded-tl-[8px] rounded-bl-[16px] rounded-br-[8px]">
            <span>Adicionar</span>
            <PlusSmallIcon className="w-6" />
          </div>
        </Link>
      </div>
      <div>
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Product Name</td>
              <td className="text-center">Edit</td>
              <td className="text-center">Delete</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>
                  <Link
                    href={"/products/edit/" + product._id}
                    className="flex px-4"
                  >
                    <PencilSquareIcon className="w-6" />
                  </Link>
                </td>
                <td>
                  <Link
                    href={"/products/delete/" + product._id}
                    className="flex px-4"
                  >
                    <TrashIcon className="w-6" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

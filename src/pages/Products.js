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
          <div className="bg-blue-600 flex px-4 py-2 text-white rounded-tr-[16px] rounded-tl-[8px] rounded-bl-[16px] rounded-br-[8px] hover:bg-black hover:transition-all hover:duration-500 duration-500">
            <span>Cadastrar</span>
            <PlusSmallIcon className="w-6" />
          </div>
        </Link>
      </div>
      <div>
        <table className="basic mt-4">
          <thead>
            <tr>
              <td className="font-bold">Nome do Produto</td>
              <td className="text-center font-bold">R$</td>
              <td className="text-center font-bold">Editar</td>
              <td className="text-center font-bold">Deletar</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <Link
                    href={"/products/edit/" + product._id}
                    className="flex px-4"
                  >
                    <PencilSquareIcon className="w-6 hover:text-blue-600 hover:transition-all hover:duration-300 duration-300" />
                  </Link>
                </td>
                <td>
                  <Link
                    href={"/products/delete/" + product._id}
                    className="flex px-4 hover:text-red-600 hover:transition-all hover:duration-300 duration-300"
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

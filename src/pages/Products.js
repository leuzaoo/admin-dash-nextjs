/* eslint-disable react/jsx-key */
import Layout from "@/src/components/Layout";

import Link from "next/link";
import axios from "axios";

import { PlusSmallIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { PencilSquareIcon } from "@heroicons/react/24/outline";

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
          <div className=" bg-blue-600 flex items-center text-sm px-3 py-1 text-white rounded-tr-[16px] rounded-tl-[8px] rounded-bl-[16px] rounded-br-[8px] hover:bg-black hover:transition-all hover:duration-500 duration-500">
            <span>Cadastrar</span>
            <PlusSmallIcon className="w-5 font-bold" />
          </div>
        </Link>
      </div>
      <div>
        <table className="basic mt-4">
          <thead>
            <tr>
              <td className="font-bold">Nome do Produto</td>
              <td className="text-center font-bold">R$</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <Link
                    className="flex items-center text-white bg-blue-700 gap-1 px-2 py-1 rounded-md shadow-sm shadow-gray-300  text-sm"
                    href={"/products/edit/" + product._id}
                  >
                    <PencilSquareIcon className="w-6" />
                    Editar
                  </Link>
                </td>
                <td>
                  <Link
                    className="flex items-center text-white bg-red-700 gap-1 px-2 py-1 rounded-md shadow-sm shadow-gray-300  text-sm"
                    href={"/products/delete/" + product._id}
                  >
                    <TrashIcon className="w-6" />
                    Excluir
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

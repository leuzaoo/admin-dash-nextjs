/* eslint-disable react/no-unescaped-entities */
import Layout from "@/src/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push("/products");
  }
  return (
    <Layout>
      <h1>
        Confirme para mim se você deseja deletar <b>"{productInfo?.title}"</b>?
      </h1>
      <div className="flex gap-4">
        <button className="bg-red-600 text-white font-bold rounded-full px-6 py-2">
          Confirmar
        </button>
        <button
          className="bg-black text-white font-bold rounded-full px-6 py-2 "
          onClick={goBack}
        >
          Voltar
        </button>
      </div>
    </Layout>
  );
}

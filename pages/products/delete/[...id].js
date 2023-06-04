/* eslint-disable react/no-unescaped-entities */
import Layout from "@/src/components/Layout";
import SaveButton from "@/src/components/buttons/SaveButton";
import CancelButton from "@/src/components/buttons/CancelButton";
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
  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }

  return (
    <Layout>
      <h1>
        Confirme para mim se você deseja deletar <b>"{productInfo?.title}"</b>?
      </h1>
      <div className="flex gap-4 mt-4">
        <SaveButton onClick={deleteProduct} text="Sim, deletar!" />
        <CancelButton onClick={goBack} text="Voltar" />
      </div>
    </Layout>
  );
}

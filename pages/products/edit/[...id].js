import Layout from "@/src/components/Layout";
import ProductForm from "@/src/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id="+id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h2>Editar produto</h2>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}

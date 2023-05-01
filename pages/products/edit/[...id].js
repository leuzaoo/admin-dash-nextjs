import Layout from "@/src/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=").then((response) => {
      console.log(response.data);
    });
  }, [id]);
  return <Layout>edit product here</Layout>;
}

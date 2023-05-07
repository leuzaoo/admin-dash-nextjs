import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })
      console.log(res);
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <div className="border-[1px] p-4 rounded flex flex-col gap-2">
        <label className="text-sm font-bold">Informações do Produto*</label>
        <input
          type="text"
          placeholder="Nome"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label className="text-sm font-bold">Imagens*</label>
        <label className="cursor-pointer w-24 h-24 border rounded-lg border-gray-400 flex flex-col items-center justify-center  text-gray-400 bg-gray-200">
          <ArrowUpTrayIcon className="w-6" />
          <span>Adicionar</span>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
        <div>
          {!images?.length && <div>Este produto ainda não possui imagens.</div>}
        </div>
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        <label className="text-sm font-bold">Preço*</label>
        <input
          type="number"
          placeholder="1.999,90"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />

        <button
          type="submit"
          className="bg-black text-white rounded-lg center w-32 px-4 py-2 transition-all duration-300 hover:bg-blue-500 hover:transition-all hover:duration-300"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}

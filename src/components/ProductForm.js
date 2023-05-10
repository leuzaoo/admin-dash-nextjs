import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import { useRouter } from "next/router";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

import axios from "axios";
import LoaderIcon from "./LoaderIcon";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price, images };
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
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  function updateImagesOrder(images) {
    setImages(images);
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
        <div className="flex flex-wrap gap-2 items-center">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-2 "
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link) => (
                <div key={link} className="h-24">
                  <img className="rounded-lg" src={link} />
                </div>
              ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center">
              <LoaderIcon />
            </div>
          )}
          <label className="flex items-center justify-center gap-2 cursor-pointer w-32 h-12 rounded-tl-[20px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[20px]  text-white bg-black">
            <ArrowUpTrayIcon className="w-6" />
            <span>Adicionar</span>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-black text-white rounded-lg center w-32 px-4 py-2 transition-all duration-700 hover:bg-blue-500 hover:transition-all hover:duration-300"
          >
            Salvar
          </button>
          <button
            href="/products"
            className="bg-gray-200 w-[128px] h-[40px] rounded-lg transition-all duration-700 hover:bg-blue-500 hover:transition-all hover:text-white hover:duration-300"
          >
            Voltar
          </button>
        </div>
      </div>
    </form>
  );
}

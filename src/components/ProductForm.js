import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

import { useRouter } from "next/router";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

import axios from "axios";
import LoaderIcon from "./LoaderIcon";
import InputField from "./InputField";
import SaveButton from "./buttons/SaveButton";
import CancelButton from "./buttons/CancelButton";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
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

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <div className="border-[1px] p-4 rounded flex flex-col gap-2">
        <label>Nome do Produto*</label>
        <InputField
          type="text"
          placeholder="iPhone 14 Pro Max"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label className="mt-4">Categoria*</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option>Escolha uma categoria</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p) => (
            <div className="mt-4">
              <div className="text-gray-400 text-sm">{p.name}*</div>
              <select
                className="w-auto pr-4 mt-2 bg-gray-100"
                value={productProperties[p.name]}
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
              >
                {p.values.map((v) => (
                  <option value={v}>{v}</option>
                ))}
              </select>
            </div>
          ))}
        <label className="mt-4">Imagens*</label>
        <div className="flex flex-wrap items-end gap-2">
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
          <label className="flex gap-1 cursor-pointer py-2 px-4 drop-shadow-md rounded-lg text-white bg-blue-600 hover:bg-black hover:duration-500 duration-500">
            <ArrowUpTrayIcon className="w-5" />
            <span className="text-sm">Upload</span>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div>

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        <label className="mt-4">Preço*</label>
        <input
          type="number"
          placeholder="1.999,90"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <div className="flex gap-4">
          <SaveButton type="submit" text="Salvar" />
          <CancelButton text="Cancelar" />
        </div>
      </div>
    </form>
  );
}

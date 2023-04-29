import Layout from "@/src/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
    async function createProduct(ev){
        ev.preventDefault()
        const data = {title, description, price}
        await axios.post('/api/products', data)
    }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <div className="border-[1px] p-4 rounded flex flex-col gap-2">
          <label className="text-sm font-bold">Informações do Produto*</label>
          <input
            type="text"
            placeholder="Nome"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
          />
          <textarea 
            placeholder="Descrição" 
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />

          <label className="text-sm font-bold">Preço*</label>
          <input 
            type="number" 
            placeholder="1.999,90" 
            value={price}
            onChange={ev => setPrice(ev.target.value)}
          />

          <button 
            type="submit" 
            className="bg-black text-white rounded-lg center w-32 px-4 py-2 transition-all duration-300 hover:bg-blue-500 hover:transition-all hover:duration-300">
                Adicionar
          </button>
        </div>
      </form>
    </Layout>
  );
}

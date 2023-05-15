/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/src/components/Layout";
import SaveButton from "@/src/components/SaveButton";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get("api/categories").then((result) => {
      setCategories(result.data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    await axios.post("/api/categories", { name });
    setName("");
    fetchCategories();
  }
  return (
    <Layout>
      <h1>Categorias</h1>
      <label>Nova categoria</label>
      <form onSubmit={saveCategory} className="flex gap-4">
        <input
          type="text"
          className="w-full"
          placeholder={"Category Name"}
          onChange={(ev) => setName(ev.target.value)}
          value={name}
        />
        <select>
          <option value="">Seleciona uma categoria</option>
          {categories.length > 0 &&
            categories.map((category) => (
              // eslint-disable-next-line react/jsx-key
              <option value={category._id}>{category.name}</option>
            ))}
        </select>
        <SaveButton type="submit" text="Salvar" />
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Nome da Categoria</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              // eslint-disable-next-line react/jsx-key
              <tr>
                <td>{category.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

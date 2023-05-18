/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/src/components/Layout";
import SaveButton from "@/src/components/SaveButton";
import EditButton from "@/src/components/EditButton";
import DeleteButton from "@/src/components/DeleteButton";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
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
    await axios.post("/api/categories", { name, parentCategory });
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
        <select
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}
        >
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
            <td>Categoria Principal</td>
            <td>Editar</td>
            <td>Excluir</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              // eslint-disable-next-line react/jsx-key
              <tr>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <EditButton />
                </td>
                <td>
                  <DeleteButton />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

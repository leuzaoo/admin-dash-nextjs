/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/src/components/Layout";
import SaveButton from "@/src/components/SaveButton";
import EditButton from "@/src/components/EditButton";
import DeleteButton from "@/src/components/DeleteButton";

import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import axios from "axios";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
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
    const data = { name, parentCategory };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Você tem certeza?",
        text: `Deseja realmente excluir ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, deletar!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  }

  return (
    <Layout>
      <h1>Categorias</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
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
                  <button onClick={() => editCategory(category)}>
                    <EditButton />
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteCategory(category)}>
                    <DeleteButton />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal, ref }) => <Categories swal={swal} />);

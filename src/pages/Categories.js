/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/src/components/Layout";
import SaveButton from "@/src/components/buttons/SaveButton";
import EditButton from "@/src/components/buttons/EditButton";
import DeleteButton from "@/src/components/buttons/DeleteButton";

import { PlusIcon } from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";

import { withSwal } from "react-sweetalert2";

import axios from "axios";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
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
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
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

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h1 className="font-bold mb-4">Categorias*</h1>
      <label className="text-sm">
        {editedCategory
          ? `Editando: ${editedCategory.name}.`
          : "Criação de nova categoria*"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-4">
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
                <option value={category._id}>{category.name}</option>
              ))}
          </select>
        </div>
        <div className="mt-8">
          <label className="block">Propriedades*</label>
          <button
            onClick={addProperty}
            type="button"
            className="flex mt-2 text-white bg-blue-600 px-4 py-2 rounded-tr-[16px] rounded-tl-[8px] rounded-bl-[16px] rounded-br-[8px] rounded-full"
          >
            Adicionar <PlusIcon className="w-6" />
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  placeholder="Nome (ex: Cor, Memória)"
                  className="w-full"
                />
                <input
                  type="text"
                  value={property.values}
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  placeholder="Valor (ex: Vermelho, 64GB)"
                  className="w-full"
                />
                <button type="button" onClick={() => removeProperty(index)}>
                  <DeleteButton />
                </button>
              </div>
            ))}
        </div>
        <div className="flex items-center mt-4 gap-4">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
              className="py-2 px-4 bg-red-400 text-white rounded-md"
            >
              Cancelar
            </button>
          )}
          <SaveButton type="submit" text="Salvar" />
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-8">
          <thead>
            <tr>
              <td>Nome da Categoria</td>
              <td>Principal</td>
              <td>Editar</td>
              <td>Excluir</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
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
      )}
    </Layout>
  );
}

export default withSwal(({ swal, ref }) => <Categories swal={swal} />);

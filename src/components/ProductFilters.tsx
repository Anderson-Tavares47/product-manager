"use client";

import { useEffect, useState } from "react";
import { useProductContext } from "@/context/ProductContext";
import { IProduct } from "@/types/product";
import CustomSelect from "@/components/CustomSelect";
import ProductForm from "./ProductForm";

interface Props {
  setFiltered: (products: IProduct[]) => void;
  onOpenForm: () => void;
}

const ProductFilters: React.FC<Props> = ({ setFiltered, onOpenForm }) => {
  const { products } = useProductContext();
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [showForm, setShowForm] = useState(false);

  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/\D/g, "");
    const floatValue = parseFloat(numericValue) / 100;
    if (isNaN(floatValue)) return "";
    return floatValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  useEffect(() => {
    let filtered = [...products];

    const parseCurrency = (val: string) => parseFloat(val.replace(/\D/g, "")) / 100;

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseCurrency(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseCurrency(maxPrice));
    }

    if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFiltered(filtered);
  }, [search, minPrice, maxPrice, sort, products]);

  const inputClass =
    "w-full h-[36px] border border-[#8A8C98] rounded-[4px] px-3 text-[14px] text-[#484A55] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="bg-white p-4 rounded-md shadow mb-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      <input
        type="text"
        placeholder="Buscar por nome"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={inputClass}
      />
      <input
        type="text"
        placeholder="Preço mínimo"
        value={minPrice}
        onChange={(e) => setMinPrice(formatCurrency(e.target.value))}
        className={inputClass}
      />
      <input
        type="text"
        placeholder="Preço máximo"
        value={maxPrice}
        onChange={(e) => setMaxPrice(formatCurrency(e.target.value))}
        className={inputClass}
      />
      <CustomSelect
        value={sort}
        onChange={setSort}
        options={[
          { value: "", label: "Ordenar por..." },
          { value: "name-asc", label: "Nome (A-Z)" },
          { value: "name-desc", label: "Nome (Z-A)" },
          { value: "price-asc", label: "Preço (Menor → Maior)" },
          { value: "price-desc", label: "Preço (Maior → Menor)" },
        ]}
        placeholder="Ordenar por"
      />

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
      >
        {showForm ? "Fechar Formulário" : "Adicionar Produto"}
      </button>

      {showForm && <ProductForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default ProductFilters;

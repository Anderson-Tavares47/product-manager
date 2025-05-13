"use client";

import { useState } from "react";
import { useProductContext } from "@/context/ProductContext";
import { IProduct } from "@/types/product";

import Apple from "@/assets/img/apple.jpg";
import CadeiraGamer from "@/assets/img/cadeira gamer.jpg";
import Notebook from "@/assets/img/notebook.jpg";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";

const availableImages = [
  { label: "Notebook", value: Notebook },
  { label: "Cadeira Gamer", value: CadeiraGamer },
  { label: "Apple", value: Apple },
];

interface ProductFormProps {
  onClose: () => void;
}

export default function ProductForm({ onClose }: ProductFormProps) {
  const { dispatch } = useProductContext();

  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    price: string;
    description: string;
    imageUrl: string | StaticImageData;
  }>({
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: availableImages[0].value,
  });

  const inputClass =
    "w-full h-[36px] border border-[#8A8C98] rounded-[4px] px-3 text-[14px] text-[#484A55] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  const textareaClass =
    "w-full border border-[#8A8C98] rounded-[4px] px-3 pt-2 text-[14px] text-[#484A55] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/\D/g, "");
    const floatValue = parseFloat(numericValue) / 100;
    if (isNaN(floatValue)) return "";
    return floatValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "price") {
      setFormData((prev) => ({ ...prev, price: formatCurrency(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericPrice = parseFloat(formData.price.replace(/\D/g, "")) / 100;

    const newProduct: IProduct = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: numericPrice,
      description: formData.description,
      imageUrl: formData.imageUrl,
    };

    dispatch({ type: "ADD_PRODUCT", payload: newProduct });

    setFormData({
      name: "",
      category: "",
      price: "",
      description: "",
      imageUrl: availableImages[0].value,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full mx-4"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Cadastrar Novo Produto</h2>

        <div className="mb-4">
          <label className="block mb-1">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Categoria</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Preço</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={textareaClass}
            rows={3}
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Ou cole uma URL de imagem"
            className={inputClass}
            onBlur={(e) =>
              setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
            }
          />
        </div>

        {typeof formData.imageUrl === "string" && formData.imageUrl.trim() !== "" && (
  <div className="mb-4">
    <label className="block mb-1">Pré-visualização</label>
    <div className="w-[150px] h-[150px] border rounded flex items-center justify-center overflow-hidden">
      <img
        src={formData.imageUrl}
        alt="Prévia da imagem"
        className="w-full h-full object-contain"
      />
    </div>
  </div>
)}


        <button
          type="submit"
          className="w-full bg-blue-600 border border-gray-300 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Adicionar Produto
        </button>
      </form>
    </div>
  );
}

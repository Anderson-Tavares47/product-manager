"use client";
import { useState } from "react";
import Header from "@/components/Header";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import { ProductProvider } from "@/context/ProductContext";

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <ProductProvider>
      <Header />
      <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

       {showForm && <ProductForm onClose={() => setShowForm(false)} />}

        <ProductList />
      </main>
    </ProductProvider>
  );
}

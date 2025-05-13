"use client";

import { useEffect, useState } from "react";
import { useProductContext } from "@/context/ProductContext";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import { IProduct } from "@/types/product";

const PRODUCTS_PER_PAGE = 6;

const ProductList: React.FC = () => {
  const { products } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilteredProducts(products);
    setCurrentPage(1);
  }, [products]);

  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      <ProductFilters
        setFiltered={(f) => {
          setFilteredProducts(f);
          setCurrentPage(1);
        }}
        onOpenForm={() => {}}
      />

      {currentProducts.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">Nenhum produto encontrado.</p>
      ) : (
        <div className="w-full max-w-7xl grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#0060B1] text-white rounded disabled:opacity-50 hover:bg-[#00509b] transition"
          >
            Anterior
          </button>
          <span className="text-sm font-medium text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#0060B1] text-white rounded disabled:opacity-50 hover:bg-[#00509b] transition"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

"use client";
import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { IProduct } from "@/types/product";
import { fetchProducts } from "@/services/productService";

type ProductAction =
  | { type: "SET_PRODUCTS"; payload: IProduct[] }
  | { type: "ADD_PRODUCT"; payload: IProduct };

interface ProductContextType {
  products: IProduct[];
  dispatch: React.Dispatch<ProductAction>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const productReducer = (state: IProduct[], action: ProductAction): IProduct[] => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return action.payload;
    case "ADD_PRODUCT":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, dispatch] = useReducer(productReducer, []);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      dispatch({ type: "SET_PRODUCTS", payload: data });
    }
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext deve estar dentro do ProductProvider");
  }
  return context;
};

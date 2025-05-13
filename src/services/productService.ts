import { mockProducts } from "@/data/mockProducts";
import { IProduct } from "@/types/product";

export async function fetchProducts(): Promise<IProduct[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
}

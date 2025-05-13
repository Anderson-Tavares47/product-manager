import { IProduct } from "@/types/product";
import Apple from "@/assets/img/apple.jpg";
import CadeiraGamer from "@/assets/img/cadeira gamer.jpg";
import Notebook from "@/assets/img/notebook.jpg";
import Image from "next/image";

export const mockProducts: IProduct[] = [
  {
    id: 1,
    name: "Notebook",
    category: "Informática",
    price: 4500,
    description: "Notebook com processador i7 e SSD.",
    imageUrl: Notebook,
  },
  {
    id: 2,
    name: "Cadeira Gamer",
    category: "Móveis",
    price: 1200,
    description: "Conforto e ergonomia para seu setup.",
    imageUrl: CadeiraGamer,
  },
  {
    id: 3,
    name: "Smartphone",
    category: "Telefonia",
    price: 2500,
    description: "Tela AMOLED, 128GB de armazenamento.",
    imageUrl: Apple,
  },
];

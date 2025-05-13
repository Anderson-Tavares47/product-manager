import { StaticImageData } from "next/image";

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string | StaticImageData;
}

import { IProduct } from "@/types/product";

interface Props {
  product: IProduct;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
      <div className="w-full aspect-square max-w-[150px] mx-auto mb-4 overflow-hidden rounded relative border">
        <img
          src={
            typeof product.imageUrl === "string"
              ? product.imageUrl
              : product.imageUrl.src
          }
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-500 mb-1">{product.category}</p>
      <p className="text-green-600 font-bold mb-2">
        R$ {product.price.toFixed(2)}
      </p>
      <p className="text-sm text-gray-700">{product.description}</p>
    </div>
  );
};

export default ProductCard;

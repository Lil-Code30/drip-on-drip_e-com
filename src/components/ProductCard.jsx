import { Link } from "react-router-dom";

import WishListBtn from "./WishListBtn";

export default function ProductCard({ product }) {
  const discountPercent = product.discountPercentage.toFixed() + "% OFF";
  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  return (
    <Link
      to={`product/${product.id}`}
      className="bg-white shadow-sm rounded p-2 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative border-1 border-black/50 mb-1 shadow-lg rounded">
        <img src={product.images[0]} alt={product.title} />
        {product.discountPercentage.toFixed() > 0 ? (
          <div className="absolute -top-1 -left-1 bg-yellow-400 w-auto px-1 text-md rounded-sm flex-center">
            <span>{discountPercent}</span>
          </div>
        ) : null}
        <div className="absolute right-0 top-0">
          <WishListBtn />
        </div>
      </div>
      <h1 className="font-inter font-bold mt-1.5">{product.title}</h1>
      <p className="line-clamp-2 mb-1.5">{product.description}</p>
      <div className="mt-auto">
        {product.discountPercentage.toFixed() > 0 ? (
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="text-xl text-blue-500 font-semibold">
              ${product.price.toFixed(2)}
            </span>
          </div>
        ) : (
          <span className=" text-xl text-blue-500 font-semibold">
            ${product.price.toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  );
}

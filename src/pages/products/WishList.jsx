import { useWishList } from "../../contexts/WishListContext";
import { useCart } from "../../contexts/CartContext";

export default function WishList() {
  const { wishList, removeFromWishList } = useWishList();
  const { addToCart } = useCart();

  const wishListEl = wishList.map((product) => {
    const originalPrice =
      product.price / (1 - product.discountPercentage / 100);

    const productToCart = {
      id: product.id,
      name: product.title,
      productImage: product.images[0],
      quantity: 1,
      price: product.price,
    };
    return (
      <tr className="my-2" key={product.id}>
        <td className="md:px-6 md:py-4">
          <img
            className="h-10 w-20 md:size-30"
            src={product.images[0]}
            alt={product.title}
          />
        </td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
          {product.title}
        </td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
          <span className="text-gray-400 text-xs line-through">
            ${originalPrice.toFixed(2)}
          </span>
          <span className="text-md ml-0.5 text-black font-semibold">
            ${product.price.toFixed(2)}
          </span>
        </td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
          {product.availabilityStatus === "In Stock" ? (
            <span className="text-green-700">{product.availabilityStatus}</span>
          ) : (
            <span className="text-red-700">{product.availabilityStatus}</span>
          )}
        </td>
        <td>
          <button
            onClick={() => addToCart(productToCart)}
            title="Add To Cart"
            className="flex-center bg-green-600 text-white rounded py-1 hover:cursor-pointer hover:bg-white hover:text-green-600 hover:border hover:border-green-600 transition-all duration-300 ease-in px-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
        </td>
        <td>
          <button
            onClick={() => removeFromWishList(product.id)}
            title="Remove Product from wishlist"
            className="text-red-600 hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1 className="text-2xl font-semibold py-1.5">Wishlist</h1>
      {wishList.length > 0 ? (
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 font-medium uppercase"
                  colSpan={2}
                >
                  Product
                </th>
                <th scope="col" class="px-6 py-3 font-medium uppercase">
                  Price
                </th>
                <th scope="col" class="px-6 py-3 font-medium uppercase">
                  Stock Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 font-medium uppercase"
                  colSpan={2}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{wishListEl}</tbody>
          </table>
        </div>
      ) : (
        <div className="flex-center h-[50vh]">
          <p className="text-2xl font-semibold text-gray-600">
            No Product in you WishList
          </p>
        </div>
      )}
    </>
  );
}

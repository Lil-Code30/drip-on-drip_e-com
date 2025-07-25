import { useCart } from "../../contexts/CartContext";

export default function CartElement({ item }) {
  const { DeleteProductFromCart, incrementQuantity, decrementQuantity } =
    useCart();

  let subTotal = item.quantity * item.price;

  return (
    <tr key={item.id} className="text-sm">
      <td>
        <div className="flex item-center">
          <img
            className="size-10 md:size-20"
            src={item.product.images[0]}
            alt={item.product.name}
          />
          <p className="self-center">{item.product.name}</p>
        </div>
      </td>
      <td className="px-0.5">{item.price} $CAD</td>
      <td className="px-0.5">
        <div className="border rounded-lg flex item-center justify-between px-1 w-20 h-8">
          <button onClick={() => decrementQuantity(item.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
          <span className="align-middle flex-center ">{item.quantity}</span>
          <button onClick={() => incrementQuantity(item.id)}>
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-0.5">{subTotal.toFixed(2)} $CAD</td>
      <td className="px-0.5 text-red-600">
        <button
          className="hover:cursor-pointer"
          title="Delete product from cart"
          onClick={() => DeleteProductFromCart(item.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4 "
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
}

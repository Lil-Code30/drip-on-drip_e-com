export default function QuantityBox({
  quantity,
  incrementQuantity,
  decrementQuantity,
}) {
  return (
    <div className="border rounded-lg flex item-center justify-between px-1 w-20 h-8">
      <button onClick={() => decrementQuantity()}>
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
      <span className="align-middle flex-center ">{quantity}</span>
      <button onClick={() => incrementQuantity()}>
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
  );
}

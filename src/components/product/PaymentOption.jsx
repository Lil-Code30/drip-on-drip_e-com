export function CashOption() {
  return <p>Same as billing informations</p>;
}

export function VenmoOption() {
  return (
    <>
      <input
        type="text"
        name="venmoId"
        placeholder="Venmo USername or Email"
        className="w-full border border-gray-400 rounded pl-1 h-8"
      />
    </>
  );
}

export function PayPal({ checkoutForm }) {
  return (
    <input
      type="email"
      name="paypalEmail"
      {...checkoutForm.register("paypalEmail")}
      placeholder="PayPal Email"
      className="w-full border border-gray-400 rounded pl-1 h-8"
    />
  );
}

export function AmazonPay() {
  return (
    <input
      type="email"
      name="amazonEmail"
      placeholder="Amazon Email"
      className="w-full border border-gray-400 rounded pl-1 h-8"
    />
  );
}

export function DebitOrCreditCard({ checkoutForm }) {
  return (
    <>
      <input
        type="text"
        name="cardHolderName"
        {...checkoutForm.register("cardHolderName")}
        placeholder="Name on Card"
        className="w-full border border-gray-400 rounded my-1.5 pl-1 h-8"
      />
      <input
        type="text"
        name="cardNumber"
        placeholder="Card Number"
        {...checkoutForm.register("cardNumber")}
        className="w-full border border-gray-400 rounded my-1.5 pl-1 h-8"
      />
      <div className="flex w-full gap-x-2.5 items-center">
        <input
          type="month"
          name="cardExpiry"
          placeholder="MM/YY"
          {...checkoutForm.register("cardExpiry")}
          className="w-full border border-gray-400 rounded my-1.5 pl-1 h-8"
        />
        <input
          type="number"
          name="cardCVC"
          placeholder="CVC"
          {...checkoutForm.register("cardCVC")}
          className="w-full border border-gray-400 rounded my-1.5 pl-1 h-8"
        />
      </div>
    </>
  );
}

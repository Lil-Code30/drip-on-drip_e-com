export default function ShippingInfos({ checkoutForm }) {
  return (
    <>
      <div className="flex gap-x-2 w-full items-center my-2">
        <div className="w-[50%] flex flex-col">
          <label>
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="shippingFirstName"
            {...checkoutForm.register("shippingFirstName")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
        <div className="w-[50%] flex flex-col">
          <label>
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="shippingLastName"
            {...checkoutForm.register("shippingLastName")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
      </div>
      <div className="my-2 flex flex-col">
        <label>
          Address Line 1 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="shippingAddressLine1"
          {...checkoutForm.register("shippingAddressLine1")}
          className="rounded border border-gray-300 p-2"
        />
      </div>
      <div className="my-2 flex flex-col">
        <label>Address Line 2 (optional)</label>
        <input
          type="text"
          name="shippingAddressLine2"
          {...checkoutForm.register("shippingAddressLine2")}
          placeholder="Apartment, suite, etc."
          className="rounded border border-gray-300 p-2"
        />
      </div>
      <div className="flex gap-x-2 w-full items-center my-2">
        <div className="w-[50%] flex flex-col">
          <label>
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="shippingCity"
            {...checkoutForm.register("shippingCity")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
        <div className="w-[50%] flex flex-col">
          <label>
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="shippingPostalCode"
            {...checkoutForm.register("shippingPostalCode")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
      </div>
      <div className="flex gap-x-2 w-full items-center my-2">
        <div className="w-[70%] flex flex-col">
          <label>
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="shippingCountry"
            {...checkoutForm.register("shippingCountry")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
        <div className="w-[30%] flex flex-col">
          <label>
            State/Province <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="shippingState"
            {...checkoutForm.register("shippingState")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
      </div>
      <div className="my-2 flex items-center gap-x-2">
        <div className="w-[50%] flex flex-col">
          <label htmlFor="shippingEmail">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="shippingEmail"
            {...checkoutForm.register("shippingEmail")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
        <div className="w-[50%] flex flex-col">
          <label htmlFor="shippingPhone">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="shippingPhone"
            {...checkoutForm.register("shippingPhone")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
      </div>
    </>
  );
}

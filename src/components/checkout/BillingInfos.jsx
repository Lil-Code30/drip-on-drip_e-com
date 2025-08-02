export default function BillingInfos({ checkoutForm }) {
  return (
    <>
      <div className="flex gap-x-2 w-full items-center my-2">
        <div className="w-[50%] flex flex-col">
          <label>
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="billingFirstName"
            {...checkoutForm.register("billingFirstName")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
        <div className="w-[50%] flex flex-col">
          <label>
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="billingLastName"
            {...checkoutForm.register("billingLastName")}
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
          name="billingAddressLine1"
          {...checkoutForm.register("billingAddressLine1")}
          className="rounded border border-gray-300 p-2"
        />
      </div>
      <div className="my-2 flex flex-col">
        <label>Address Line 2 (optional)</label>
        <input
          type="text"
          name="billingAddressLine2"
          placeholder="Apartment, suite, etc."
          {...checkoutForm.register("billingAddressLine2")}
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
            name="billingCity"
            {...checkoutForm.register("billingCity")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
        <div className="w-[50%] flex flex-col">
          <label>
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="billingPostalCode"
            {...checkoutForm.register("billingPostalCode")}
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
            name="billingCountry"
            {...checkoutForm.register("billingCountry")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
        <div className="w-[30%] flex flex-col">
          <label>
            State/Province <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="billingState"
            {...checkoutForm.register("billingState")}
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
            name="billingEmail"
            {...checkoutForm.register("billingEmail")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
        <div className="w-[50%] flex flex-col">
          <label htmlFor="billingPhone">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="billingPhone"
            {...checkoutForm.register("billingPhone")}
            className="rounded border border-gray-300 p-2"
          />
        </div>
      </div>
    </>
  );
}

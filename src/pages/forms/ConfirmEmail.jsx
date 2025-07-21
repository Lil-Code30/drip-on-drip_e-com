const ConfirmEmail = () => {
  return (
    <form
      class="max-w-sm mx-auto font-inter  mt-10  flex flex-col gap-y-3"
      action="#"
    >
      <h5 class="text-2xl  text-center font-geist font-semibold text-gray-900">
        Verification Code
      </h5>
      <p className="text-center text-gray-500">
        Enter the verification code send to your email address
        <br />
      </p>
      <div class="mb-5">
        <div class="flex gap-x-5">
          <input
            type="text"
            id="verification-code"
            name="verification-code1"
            class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
          <input
            type="text"
            id="verification-code"
            name="verification-code2"
            class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
          <input
            type="text"
            id="verification-code"
            name="verification-code3"
            class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
          <input
            type="text"
            id="verification-code"
            name="verification-code4"
            class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
          <input
            type="text"
            id="verification-code"
            name="verification-code5"
            class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
          <input
            type="text"
            id="verification-code"
            name="verification-code6"
            class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Confirm
      </button>
    </form>
  );
};

export default ConfirmEmail;

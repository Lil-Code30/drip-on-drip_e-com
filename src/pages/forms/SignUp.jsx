import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../api";
import { useUser } from "../../contexts/UserInfosContext";
import { showToast } from "../../components/ToastNotify";

export default function SignUp() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { handleUser } = useUser();

  const createUserQuery = useMutation({
    mutationFn: async (formData) => {
      const data = await createUser(formData.email, formData.password);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("userInfos", JSON.stringify(data));
      handleUser(data);

      setErrorMsg("");
      showToast("Account created successfully", "success");
      navigate("/");
    },
    onError: (error) => {
      setErrorMsg(`Error: ${error.response.data.message}`);
    },
  });

  // function to handle the creation of the user account
  const handleSubmit = (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("repeatPassword");

    if (!(password.length >= 8)) {
      setErrorMsg("Your password must be more than 8 characters");
      return;
    }
    if (password !== password2) {
      setErrorMsg("The two passwords are not the same.");
      return;
    }

    if (email && password && password2) {
      setErrorMsg("");
      const data = { email, password };
      createUserQuery.mutate(data);
    }
  };

  return (
    <form
      action={handleSubmit}
      class="max-w-sm mx-auto font-inter mt-10  flex flex-col gap-y-3"
    >
      <h5 class="text-2xl  text-center font-geist font-semibold text-gray-900">
        Sign up to our platform
      </h5>
      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-md font-medium text-gray-900 "
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-md font-medium text-gray-900 "
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
          placeholder="8+ characters"
        />
      </div>
      <div class="mb-5">
        <label
          for="repeat-password"
          class="block mb-2 text-md font-medium text-gray-900 "
        >
          Confirm password
        </label>
        <input
          type="password"
          id="repeat-password"
          name="repeatPassword"
          class="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
        />
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label for="terms" class="ms-2 text-sm font-medium text-gray-900 ">
          I agree with the{" "}
          <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">
            terms and conditions
          </a>
        </label>
      </div>
      {errorMsg && (
        <span className="text-red-600 my-3 text-sm text-center">
          {errorMsg}
        </span>
      )}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register new account
      </button>
      <div class="text-sm font-medium text-black">
        Already have an account?{" "}
        <Link
          to="/login"
          class="text-blue-700 hover:underline dark:text-blue-500"
        >
          login
        </Link>
      </div>
      <div className="flex w-full items-center">
        <hr className="border-0.5 border-gray-500 w-full" />
        <h2 className="text-center px-5">or</h2>
        <hr className="border-0.5 w-full border-gray-500" />
      </div>
      <div className="flex flex-col gap-y-2">
        <button
          type="button"
          class="w-full text-gray-950 hover:bg-gray-200  focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center border border-gray-300
          "
        >
          <svg
            class="w-4 h-4 me-2 text-[#4285F4]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fill-rule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clip-rule="evenodd"
            />
          </svg>
          Sign up with Google
        </button>
        <button
          type="button"
          class="w-full text-gray-950 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center border border-gray-300
          "
        >
          <svg
            role="img"
            class="w-4 h-4 me-2 "
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Apple</title>
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
          Sign up with Apple
        </button>
      </div>
    </form>
  );
}

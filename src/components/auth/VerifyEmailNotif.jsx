import { Link } from "react-router-dom";

const VerifyEmailNotif = () => {
  return (
    <div
      id="alert-additional-content-1"
      class="p-4 mb-4 text-blue-800  border border-blue-300 rounded-lg bg-blue-50  "
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="shrink-0 w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">Account Not Verify</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">
        A verification code has been send to your email address associated to
        this account. Click on the button below to enter the verification code.
      </div>
      <Link
        to="verify-email"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Enter
      </Link>
    </div>
  );
};

export default VerifyEmailNotif;

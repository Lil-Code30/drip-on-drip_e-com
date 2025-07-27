import { LogOut, SquareUserRound, Truck, Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserInfosContext";

const ProfileSummary = () => {
  const navigate = useNavigate();
  const { handleUser } = useUser();
  const handleLogout = () => {
    localStorage.removeItem("userInfos");
    handleUser({});
    navigate("/");
  };
  return (
    <section className="w-full">
      <div className="flex  items-center justify-between">
        <div>
          <h1 className="text-2xl">
            Hello <span className="font-bold">Ismael</span>
          </h1>
          <p>Welcome back :)</p>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="hidden  border px-2 py-1 rounded bg-red-600 md:flex justify-center gap-x-1.5 items-center text-white hover:border-red-600 hover:text-red-600 hover:bg-transparent transition-colors duration-300 ease-in"
          >
            <span>Logout</span> <LogOut />{" "}
          </button>
        </div>
      </div>
      <div className="flex flex-col item-center justify-between mt-2  gap-2 md:flex-row w-full">
        <div className=" w-full md:w-1/2">
          <div className="border rounded my-2">
            <h2 className=" bg-gray-300 border-gray-300 rounded flex items-center justify-between py-1.5 px-1">
              <span>Account Details</span>{" "}
              <Link
                to="/profile/account-details"
                className="text-gray-500 underline"
              >
                view details
              </Link>
            </h2>
            <div className="flex items-center justify-around py-2">
              <SquareUserRound size="50" />
              <div className="text-sm">
                <p>John Doe</p>
                <p>19/01/1800</p>
                <p>john.doe@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="border rounded my-2">
            <h2 className=" bg-gray-300 border-gray-300 rounded flex items-center justify-between py-1.5 px-1">
              <span>Shipping Address</span>{" "}
              <Link
                to="/profile/all-addresses"
                className="text-gray-500 underline"
              >
                All Addresses
              </Link>
            </h2>
            <div className="flex items-center justify-around  py-2">
              <Truck size="50" />
              <div className="text-sm ">
                <p>John Doe</p>
                <p>123 rue des roses</p>
                <p>Qc, Qc, Canada</p>
              </div>
            </div>
          </div>
          <div className="border rounded my-2">
            <h2 className=" bg-gray-300 border-gray-300 rounded flex items-center justify-between py-1.5 px-1">
              <span>Order History</span>{" "}
              <Link className="text-gray-500 underline">view all orders</Link>
            </h2>
            <div className="flex items-center justify-around  py-2">
              <Wallet size="50" />
              <div className="text-sm ">
                <p>
                  {" "}
                  <span className="font-semibold">Order Number : </span>
                  MUSWDRFG
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">Date Ordered : </span>{" "}
                  23/09/2024
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">Status : </span>dispatched
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[70%]">
          <div className="border rounded my-2">
            <h2 className=" bg-gray-300 border-gray-300 rounded flex items-center justify-between py-1.5 px-1">
              <span className="uppercase">Wish List</span>{" "}
              <Link to="/wishlist" className="text-gray-500 underline">
                All Products
              </Link>
            </h2>
            <div className="flex items-center justify-around  py-2">
              <Wallet size="50" />
              <div className="text-sm ">
                <p>
                  {" "}
                  <span className="font-semibold">Product Name : </span>
                  Air Jordan
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">Price : </span> 23.99 $CAD
                </p>

                <button>Add to Cart</button>
              </div>
            </div>
            <div className="flex items-center justify-around  py-2">
              <Wallet size="50" />
              <div className="text-sm ">
                <p>
                  {" "}
                  <span className="font-semibold">Product Name : </span>
                  MUSWDRFG
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">Price : </span> 30.99 $CAD
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSummary;

import { Link, Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserInfosContext";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";

const Profile = () => {
  const { userInfos } = useUser();
  let loading = false;
  let error = false;

  if (!userInfos?.token) {
    return (
      <div className="flex-center flex-col gap-y-2 h-[50vh]">
        <p className="text-2xl font-semibold text-gray-600">
          You are not connected
        </p>
        <div className="flex-center gap-x-3">
          <Link
            to="/login"
            className="border-2 py-1 px-0.5 border-blue-500 text-blue-500 font-semibold text-xl hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="border-2 py-1 px-0.5 border-blue-500 text-blue-500 font-semibold text-xl hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in"
          >
            Signup
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col-reverse md:flex-row md:gap-x-3 gap-2 w-full mx-auto ">
        <div className="w-full md:w-[20%] ">
          <h3 className="text-sm py-2">MY ACCOUNT</h3>
          <div className="mb-2">
            <h2 className="profile-title">My Account</h2>
            <div className="flex flex-col p-1">
              <Link className="hover:underline" to="/profile/account-details">
                Account details
              </Link>
              <Link className="hover:underline" to="/profile/all-addresses">
                Addresses
              </Link>
              <Link className="hover:underline" to="/profile/payment-details">
                Payments details
              </Link>
            </div>
          </div>
          <div className="mb-2">
            <h2 className="profile-title">Order Information</h2>
            <div className="flex flex-col p-1">
              <Link className="hover:underline">Order History</Link>
              <Link className="hover:underline">Return</Link>
            </div>
          </div>
          <div className="mb-2">
            <h2 className="profile-title">Track My Order</h2>
            <div className="flex flex-col p-1">
              <Link className="hover:underline">Tracking</Link>
            </div>
          </div>
          <div className="mb-2">
            <h2 className="profile-title">Wish List</h2>
            <div className="flex flex-col p-1">
              <Link className="hover:underline">My Wish list</Link>
            </div>
          </div>
          <div>
            <h2 className="profile-title">Shop Comfidently</h2>
            <div className="flex flex-col p-1">
              <Link className="hover:underline">Privacy Policy</Link>
              <Link className="hover:underline">Return Infos</Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[80%] p-2">
          {loading ? (
            <Loading />
          ) : error ? (
            <Error error="Error when fetching user profile" />
          ) : (
            <Outlet context={{ userInfos }} />
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;

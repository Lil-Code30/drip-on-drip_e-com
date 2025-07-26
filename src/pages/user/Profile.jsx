import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <section className="flex flex-col-reverse md:flex-row md:gap-x-3 gap-2 w-full mx-auto ">
        <div className="w-full md:w-[20%] ">
          <h3 className="text-sm py-2">MY ACCOUNT</h3>
          <div className="mb-2">
            <h2 className="profile-title">My Account</h2>
            <div className="flex flex-col p-1">
              <Link>Account details</Link>
              <Link>Addresses</Link>
              <Link>Payments details</Link>
            </div>
          </div>
          <div className="mb-2">
            <h2 className="profile-title">Order Information</h2>
            <div className="flex flex-col p-1">
              <Link>Order History</Link>
              <Link>Return</Link>
            </div>
          </div>
          <div className="mb-2">
            <h2 className="profile-title">Track My Order</h2>
            <div className="flex flex-col p-1">
              <Link>Tracking</Link>
            </div>
          </div>
          <div className="mb-2">
            <h2 className="profile-title">Wish List</h2>
            <div className="flex flex-col p-1">
              <Link>My Wish list</Link>
            </div>
          </div>
          <div>
            <h2 className="profile-title">Shop Comfidently</h2>
            <div className="flex flex-col p-1">
              <Link>Privacy Policy</Link>
              <Link>Return Infos</Link>
            </div>
          </div>
        </div>

        <Outlet className="w-full md:w-[80%] p-2" />
      </section>
    </>
  );
};

export default Profile;

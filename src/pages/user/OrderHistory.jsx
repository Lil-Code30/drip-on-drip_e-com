import { Link, useOutletContext } from "react-router-dom";

import OrderCard from "../../components/profile/OrderCard";

const OrderHistory = () => {
  const { UserOrders } = useOutletContext();

  return (
    <section>
      <p className="text-sm pb-2">
        <Link className="underline" to="/profile">
          My Account
        </Link>{" "}
        &gt; <span className="text-gray-500">Order History</span>
      </p>
      <div className="w-full  flex flex-col-reverse md:flex-row justify-between">
        <div className=" w-full">
          <h1 className="text-xl font-semibold">Orders</h1>
          {UserOrders.length > 0 ? (
            <div className="flex w-full  flex-wrap gap-2 mt-2 ">
              {UserOrders.map((item) => (
                <OrderCard key={item.id} order={item} />
              ))}
            </div>
          ) : (
            <div>
              <h2>No Order </h2>
              <p>You can start shopping</p>
              <Link to="/shop">Shop now</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;

import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../contexts/UserInfosContext";
import { getOrderDertails } from "../../api";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { userInfos } = useUser();

  const orderDetailsQuery = useQuery({
    queryKey: ["orderDetails"],
    queryFn: async () => {
      const data = await getOrderDertails(userInfos.token, orderId);
      return data;
    },
  });

  return (
    <section>
      <p className="text-sm pb-2">
        <Link className="underline" to="/profile">
          My Account
        </Link>{" "}
        &gt;{" "}
        <Link className="underline" to="/profile/orders">
          Order History
        </Link>{" "}
        &gt; <span className="text-gray-500">Order Details</span>
      </p>
      <h1 className="text-3xl mb-3">Order Details</h1>
      {orderDetailsQuery.isFetching ? (
        <Loading />
      ) : orderDetailsQuery.isError ? (
        <Error error={orderDetailsQuery.error.response.data.message} />
      ) : (
        <>
          <div>
            <p>
              <span className="font-semibold">Order Number: </span>
              {orderDetailsQuery?.data?.id}
            </p>
            <p>
              <span className="font-semibold">Place On: </span>
              {orderDetailsQuery?.data?.createdAt.split("T")[0]}
            </p>
            <p>
              <span className="font-semibold">Order Status: </span>
              {orderDetailsQuery?.data?.status}
            </p>
          </div>
          <h2 className="my-2 text-2xl font-medium">Shipping Details</h2>
          <div className="w-full   flex flex-col md:flex-row  gap-3 justify-around">
            <div className="w-full ">
              <h2 className="bg-gray-400/50 p-2 h-[50px]  flex-center text-xl mb-1">
                Shipping Details
              </h2>
              <p>
                {orderDetailsQuery?.data?.shippingFirstName}{" "}
                {orderDetailsQuery?.data?.shippingLastName}
              </p>
              <p>{orderDetailsQuery?.data?.shippingPhoneNumber}</p>
              <p>
                {orderDetailsQuery?.data?.shippingAddressLine1},{" "}
                {orderDetailsQuery?.data?.shippingAddressLine2}
              </p>
              <p>
                {orderDetailsQuery?.data?.shippingCity},{" "}
                {orderDetailsQuery?.data?.shippingState},{" "}
                {orderDetailsQuery?.data?.shippingPostalCode}
              </p>
              <p>{orderDetailsQuery?.data?.shippingCountry}</p>
            </div>
            <div className="w-full ">
              <h2 className="bg-gray-400/50 p-2 h-[50px] flex-center text-xl mb-1">
                Shipping Options
              </h2>
              <p>
                Canada Standard : {orderDetailsQuery?.data?.shippingAmount} $CAD
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>QTY</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetailsQuery?.data?.items?.map((item) => {
                  console.log(item.product.images[0]);
                  return (
                    <tr key={item.id}>
                      <td>
                        <Link
                          to={`/shop/product/${item.product.id}`}
                          className="flex flex-col md:flex-row items-center "
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="size-[150px]"
                          />
                          <p className="text-xl">{item.product.name}</p>
                        </Link>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.price * item.quantity} $CAD</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default OrderDetails;

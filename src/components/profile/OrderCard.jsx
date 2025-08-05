import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <div className="border rounded relative p-2">
      <Link
        to={`/profile/orders/${order.id}`}
        className="border border-gray-50 rounded bg-violet-600 text-white px-2 py-1 cursor-pointer absolute top-1 right-2"
      >
        <span>View</span>
      </Link>
      <br />
      <p className="py-1 mt-2">
        <span className="font-semibold">Order Number : </span> {order.id}
      </p>
      <p className="py-0.5 mt-2">
        <span className="font-semibold">Date Ordered : </span>{" "}
        {order.createdAt.split("T")[0]}
      </p>
      <p className="py-0.5 mt-2">
        <span className="font-semibold">Status : </span> {order.status}
      </p>
      <div className="flex justify-between items-center rounded  bg-gray-300 p-2 mt-1.5">
        <div>
          <span className="font-semibold block">Shipped To :</span>
          <span>
            {order.billingFirstName} {order.billingLastName}
          </span>
        </div>
        <div>
          <span className="font-semibold block">Order Total :</span>
          <span>{order.totalPrice} $CAD</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

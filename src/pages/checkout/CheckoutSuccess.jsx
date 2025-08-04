import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { showToast } from "../../components/common/ToastNotify";

export default function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearUserCartFn } = useCart();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from location state
    if (location.state?.orderDetails) {
      setOrderDetails(location.state.orderDetails);
      // Clear the cart after successful payment
      clearUserCartFn();
      showToast(
        "Order placed successfully! Your cart has been cleared.",
        "success"
      );
    } else {
      // If no order details, redirect to home
      navigate("/");
    }
  }, [location.state, clearUserCartFn, navigate]);

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  const handleViewOrders = () => {
    navigate("/profile/orders");
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Loading order details...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. We've received your payment and will
            process your order shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Order Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${orderDetails.subtotal} CAD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium">${orderDetails.tax} CAD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium">${orderDetails.total} CAD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status:</span>
              <span className="text-green-600 font-medium">Paid</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Status:</span>
              <span className="text-blue-600 font-medium">Processing</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        {orderDetails.items && orderDetails.items.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {orderDetails.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-sm font-medium text-gray-900">
                      ${item.price} CAD
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Customer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Billing Address
              </h3>
              <div className="text-gray-600 text-sm">
                <p>
                  {orderDetails.billingFirstName} {orderDetails.billingLastName}
                </p>
                <p>{orderDetails.billingAddressLine1}</p>
                {orderDetails.billingAddressLine2 && (
                  <p>{orderDetails.billingAddressLine2}</p>
                )}
                <p>
                  {orderDetails.billingCity}, {orderDetails.billingState}{" "}
                  {orderDetails.billingPostalCode}
                </p>
                <p>{orderDetails.billingCountry}</p>
                <p className="mt-2">{orderDetails.billingEmail}</p>
                <p>{orderDetails.billingPhoneNumber}</p>
              </div>
            </div>
            {orderDetails.shippingAddressLine1 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Shipping Address
                </h3>
                <div className="text-gray-600 text-sm">
                  <p>
                    {orderDetails.shippingFirstName}{" "}
                    {orderDetails.shippingLastName}
                  </p>
                  <p>{orderDetails.shippingAddressLine1}</p>
                  {orderDetails.shippingAddressLine2 && (
                    <p>{orderDetails.shippingAddressLine2}</p>
                  )}
                  <p>
                    {orderDetails.shippingCity}, {orderDetails.shippingState}{" "}
                    {orderDetails.shippingPostalCode}
                  </p>
                  <p>{orderDetails.shippingCountry}</p>
                  <p className="mt-2">{orderDetails.shippingEmail}</p>
                  <p>{orderDetails.shippingPhoneNumber}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What's Next?
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                1
              </div>
              <p>You'll receive an order confirmation email shortly.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                2
              </div>
              <p>We'll process your order and prepare it for shipping.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                3
              </div>
              <p>You'll receive tracking information once your order ships.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleContinueShopping}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleViewOrders}
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}

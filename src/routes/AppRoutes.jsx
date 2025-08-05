import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Shop from "../pages/products/Shop";
import ProductDetails from "../pages/products/ProductDetails";
import Profile from "../pages/user/Profile";
import ProfileSummary from "../pages/user/ProfileSummary";
import AccountDetails from "../pages/user/AccountDetails";
import AllAdressess from "../pages/user/AllAdresses";
import PaymentDetails from "../pages/user/PaymentDetails";
import OrderHistory from "../pages/user/OrderHistory";
import OrderDetails from "../pages/user/OrderDetails";
import Contact from "../pages/auth/Contact";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ConfirmEmail from "../pages/auth/ConfirmEmail";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import CheckoutSuccess from "../pages/checkout/CheckoutSuccess";
import WishList from "../pages/products/WishList";
import NotFound from "../pages/NotFound";

import { StripeProvider } from "../contexts/StripeContext";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<ProfileSummary />} />
            <Route
              path="/profile/account-details"
              element={<AccountDetails />}
            />
            <Route path="/profile/all-addresses" element={<AllAdressess />} />
            <Route
              path="/profile/payment-details"
              element={<PaymentDetails />}
            />
            <Route path="/profile/orders" element={<OrderHistory />} />
            <Route path="/profile/orders/:orderId" element={<OrderDetails />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<ConfirmEmail />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <StripeProvider>
                <Checkout />
              </StripeProvider>
            }
          />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

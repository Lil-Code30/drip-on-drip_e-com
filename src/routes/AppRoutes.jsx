import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Shop from "../pages/shop/Shop";
import ProductDetails from "../pages/shop/ProductDetails";
import Contact from "../pages/forms/Contact";
import Login from "../pages/forms/Login";
import SignUp from "../pages/forms/SignUp";
import Cart from "../pages/Cart";
import WishList from "../pages/WishList";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/product/:id" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

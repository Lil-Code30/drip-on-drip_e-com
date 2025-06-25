import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="px-2 py-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

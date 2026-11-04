import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <div className="storefront">
      <Header />
      <main className="min-vh-50"><Outlet /></main>
      <Footer />
    </div>
  );
}

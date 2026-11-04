import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/customer/Home";
import Products from "../pages/customer/Products";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Wishlist from "../pages/customer/Wishlist";
import Checkout from "../pages/customer/Checkout";
import MyOrders from "../pages/customer/MyOrders";
import Account from "../pages/customer/Account";
import Categories from "../pages/customer/Categories";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import AdminCategories from "../pages/admin/Categories";
import AdminBrands from "../pages/admin/Brands";
import Placeholder from "../pages/admin/Placeholder";

export default function AppRoutes() {
  return <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/account" element={<Account />} />
    </Route>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="categories" element={<AdminCategories />} />
      <Route path="brands" element={<AdminBrands />} />
      <Route path="orders" element={<Placeholder title="Orders" />} />
      <Route path="customers" element={<Placeholder title="Customers" />} />
      <Route path="reports" element={<Placeholder title="Reports" />} />
    </Route>
    <Route path="*" element={<div className="container py-5 text-center"><h2>404 - Page not found</h2><a href="/">Go Home</a></div>} />
  </Routes>;
}
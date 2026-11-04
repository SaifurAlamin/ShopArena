import { NavLink, Outlet } from "react-router-dom";
import { FiGrid, FiShoppingBag, FiLayers, FiTag, FiClipboard, FiUsers, FiBarChart2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const links = [
  ["/admin", "Dashboard", FiGrid],
  ["/admin/products", "Products", FiShoppingBag],
  ["/admin/categories", "Categories", FiLayers],
  ["/admin/brands", "Brands", FiTag],
  ["/admin/orders", "Orders", FiClipboard],
  ["/admin/customers", "Customers", FiUsers],
  ["/admin/reports", "Reports", FiBarChart2],
];

export default function AdminLayout() {
  return <div className="admin-shell"><aside className="admin-sidebar"><Link to="/" className="brand text-white mb-4 d-block">Shop<span>Arena</span></Link><small className="text-white-50 text-uppercase">Management</small>{links.map(([path, label, Icon]) => <NavLink key={path} to={path} end={path === "/admin"}><Icon /> {label}</NavLink>)}<Link to="/" className="admin-back-link">← Back to Store</Link></aside><main className="admin-content"><Outlet /></main></div>;
}
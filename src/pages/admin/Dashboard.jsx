import { FiShoppingBag, FiUsers, FiDollarSign, FiPackage } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardStats, monthlySales } from "../../data/dashboard";
import { formatCurrency, formatNumber } from "../../utils/formatters";
import PageHeader from "../../components/common/PageHeader";

const icons = [FiDollarSign, FiShoppingBag, FiUsers, FiPackage];

export default function Dashboard() {
  return <div className="container-fluid py-4"><PageHeader title="Dashboard" subtitle="Overview of your demo store performance" /><div className="row g-3 mb-4">{dashboardStats.map((stat, index) => { const Icon = icons[index]; return <div className="col-sm-6 col-xl-3" key={stat.label}><div className="stat-card"><div className="d-flex justify-content-between"><div><small className="text-muted">{stat.label}</small><h3 className="fw-bold mt-2">{index === 0 ? formatCurrency(stat.value) : formatNumber(stat.value)}</h3><small className="text-success">{stat.change} this month</small></div><span className="stat-icon"><Icon size={22} /></span></div></div></div>; })}</div><div className="summary-card"><h5 className="mb-4">Monthly Sales</h5><div style={{ width: "100%", height: 320 }}><ResponsiveContainer><BarChart data={monthlySales}><XAxis dataKey="month" /><YAxis /><Tooltip formatter={(value) => formatCurrency(value)} /><Bar dataKey="sales" fill="#315efb" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></div></div></div>;
}
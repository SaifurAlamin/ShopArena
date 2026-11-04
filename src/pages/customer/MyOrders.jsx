import { useEffect, useState } from "react";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import { formatCurrency, formatDate } from "../../utils/formatters";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => setOrders(JSON.parse(localStorage.getItem("ecommerce_orders") || "[]")), []);
  return <div className="container py-5"><h2 className="fw-bold mb-4">My Orders</h2>{!orders.length ? <EmptyState title="No orders yet" description="Your demo orders will appear here after checkout." /> : <div className="table-responsive bg-white border rounded-3"><table className="table align-middle mb-0"><thead><tr><th>Order ID</th><th>Date</th><th>Amount</th><th>Payment</th><th>Status</th></tr></thead><tbody>{orders.map((o) => <tr key={o.id}><td>{o.id}</td><td>{formatDate(o.date)}</td><td>{formatCurrency(o.total)}</td><td>{o.payment}</td><td><StatusBadge status={o.status} /></td></tr>)}</tbody></table></div>}</div>;
}
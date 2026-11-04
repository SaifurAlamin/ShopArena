import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatters";
import { calculateShipping, calculateGrandTotal } from "../../utils/calculations";

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "Cash on Delivery" });
  const shipping = calculateShipping(subtotal);
  const total = calculateGrandTotal({ subtotal, shipping });

  const submit = (e) => {
    e.preventDefault();
    if (!items.length) return toast.error("Your cart is empty");
    const order = { id: `ORD-${Date.now()}`, ...form, items, subtotal, shipping, total, status: "Pending", date: new Date().toISOString() };
    const previous = JSON.parse(localStorage.getItem("ecommerce_orders") || "[]");
    localStorage.setItem("ecommerce_orders", JSON.stringify([order, ...previous]));
    clear();
    toast.success("Demo order placed successfully");
    navigate("/orders");
  };

  return <div className="container py-5"><h2 className="fw-bold mb-4">Checkout</h2>{!items.length ? <div className="alert alert-info">Your cart is empty. <button className="btn btn-link" onClick={() => navigate("/products")}>Shop now</button></div> : <div className="row g-4"><div className="col-lg-7"><form className="summary-card" onSubmit={submit}><h5 className="mb-3">Delivery Information</h5>{[["name","Full Name","text"],["phone","Phone Number","tel"],["address","Full Address","text"]].map(([key,label,type]) => <div className="mb-3" key={key}><label className="form-label">{label}</label><input className="form-control" type={type} required value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} /></div>)}<label className="form-label">Payment Method</label><select className="form-select mb-4" value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })}><option>Cash on Delivery</option><option>Online Payment (Coming Soon)</option></select><button className="btn btn-primary w-100" type="submit">Place Demo Order</button></form></div><div className="col-lg-5"><div className="summary-card"><h5>Order Summary</h5>{items.map((item) => <div className="summary-row" key={item.id}><span>{item.name} × {item.quantity}</span><strong>{formatCurrency(item.price * item.quantity)}</strong></div>)}<hr /><div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><div className="summary-row"><span>Shipping</span><strong>{formatCurrency(shipping)}</strong></div><hr /><div className="summary-row fs-5"><strong>Total</strong><strong className="text-primary">{formatCurrency(total)}</strong></div></div></div></div>}</div>;
}
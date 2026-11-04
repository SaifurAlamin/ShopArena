import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatters";
import { calculateShipping, calculateGrandTotal } from "../../utils/calculations";
import EmptyState from "../../components/common/EmptyState";

export default function Cart() {
  const { items, subtotal, remove, update } = useCart();
  const shipping = calculateShipping(subtotal);
  const total = calculateGrandTotal({ subtotal, shipping });

  if (!items.length) return <div className="container py-5"><EmptyState title="Your cart is empty" description="Browse products and add something you like." /><div className="text-center"><Link to="/products" className="btn btn-primary">Continue Shopping</Link></div></div>;

  return <div className="container py-5"><h2 className="fw-bold mb-4">Shopping Cart</h2><div className="row g-4"><div className="col-lg-8"><div className="table-responsive bg-white rounded-3 border"><table className="table align-middle mb-0"><thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th /></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><div className="d-flex align-items-center gap-3"><img src={item.image} width="64" height="64" className="rounded object-fit-cover" alt="" /><strong>{item.name}</strong></div></td><td>{formatCurrency(item.price)}</td><td><input type="number" min="1" className="form-control quantity-input" value={item.quantity} onChange={(e) => update({ id: item.id, quantity: e.target.value })} /></td><td>{formatCurrency(item.price * item.quantity)}</td><td><button className="btn btn-sm btn-outline-danger" onClick={() => remove(item.id)}><FiTrash2 /></button></td></tr>)}</tbody></table></div></div><div className="col-lg-4"><div className="summary-card"><h5>Order Summary</h5><div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><div className="summary-row"><span>Shipping</span><strong>{shipping ? formatCurrency(shipping) : "Free"}</strong></div><hr /><div className="summary-row fs-5"><strong>Total</strong><strong className="text-primary">{formatCurrency(total)}</strong></div><Link to="/checkout" className="btn btn-primary w-100 mt-3">Proceed to Checkout</Link></div></div></div></div>;
}
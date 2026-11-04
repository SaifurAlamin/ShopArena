import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";
import { formatCurrency } from "../../utils/formatters";
import EmptyState from "../../components/common/EmptyState";

export default function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  return <div className="container py-5"><h2 className="fw-bold mb-4">My Wishlist</h2>{!items.length ? <EmptyState title="Your wishlist is empty" /> : <div className="row g-4">{items.map((p) => <div className="col-6 col-md-3" key={p.id}><div className="product-card"><img src={p.image} className="product-image" alt={p.name} /><div className="p-3"><Link className="product-name" to={`/products/${p.id}`}>{p.name}</Link><strong className="d-block my-2 text-primary">{formatCurrency(p.price)}</strong><button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(toggleWishlist(p))}>Remove</button></div></div></div>)}</div>}</div>;
}
import { useParams, Link } from "react-router-dom";
import { products } from "../../data/products";
import { formatCurrency } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const { add } = useCart();

  if (!product) return <div className="container py-5"><h3>Product not found</h3><Link to="/products">Back to products</Link></div>;

  return <div className="container py-5"><div className="row g-5 align-items-center">
    <div className="col-md-6"><img src={product.image} alt={product.name} className="img-fluid rounded-4 w-100" /></div>
    <div className="col-md-6"><span className="section-kicker">{product.category}</span><h1 className="fw-bold mt-2">{product.name}</h1><p className="text-muted">Brand: {product.brand} · Rating: ⭐ {product.rating}</p><h3 className="text-primary">{formatCurrency(product.price)}</h3><p className="mt-4">A quality {product.name.toLowerCase()} selected for everyday use. Product information shown here is sample content and can be replaced by API data later.</p><p>Availability: <strong>{product.stock > 0 ? "In Stock" : "Out of Stock"}</strong></p><button className="btn btn-primary btn-lg" disabled={!product.stock} onClick={() => { add(product); toast.success("Added to cart"); }}>Add to Cart</button></div>
  </div></div>;
}
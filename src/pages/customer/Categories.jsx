import { Link } from "react-router-dom";
import { categories } from "../../data/categories";

export default function Categories() {
  return <div className="container py-5"><h2 className="fw-bold mb-4">Shop by Category</h2><div className="row g-4">{categories.map((c) => <div className="col-6 col-md-4 col-lg-3" key={c.id}><Link className="category-card" to={`/products?category=${encodeURIComponent(c.name)}`}><img src={c.image} alt={c.name} /><span>{c.name}</span></Link></div>)}</div></div>;
}
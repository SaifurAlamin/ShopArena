import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { formatCurrency } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";

export default function Products() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [sort, setSort] = useState("default");
  const { add } = useCart();

  const filtered = useMemo(() => {
    let result = products.filter((p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [category, search, sort]);

  return (
    <div className="container py-5">
      <div className="section-heading"><div><span className="section-kicker">OUR COLLECTION</span><h2>All Products</h2></div><span className="text-muted">{filtered.length} products</span></div>
      <div className="row g-3 mb-4">
        <div className="col-md-6"><input className="form-control" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <div className="col-md-3"><select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}><option>All</option>{categories.map((c) => <option key={c.id}>{c.name}</option>)}</select></div>
        <div className="col-md-3"><select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}><option value="default">Sort by</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></div>
      </div>
      <div className="row g-4">
        {filtered.map((p) => <div className="col-6 col-md-4 col-lg-3" key={p.id}>
          <div className="product-card h-100"><Link to={`/products/${p.id}`}><img src={p.image} className="product-image" alt={p.name} /></Link>
            <div className="p-3"><small className="text-muted">{p.category}</small><Link to={`/products/${p.id}`} className="product-name">{p.name}</Link><strong className="d-block text-primary my-2">{formatCurrency(p.price)}</strong><button className="btn btn-outline-primary btn-sm w-100" onClick={() => { add(p); toast.success("Added to cart"); }}>Add to Cart</button></div>
          </div>
        </div>)}
      </div>
      {filtered.length === 0 && <div className="alert alert-light text-center mt-4">No products match your search.</div>}
    </div>
  );
}
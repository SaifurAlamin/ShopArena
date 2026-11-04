import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { toast } from "react-toastify";
import PageHeader from "../../components/common/PageHeader";
import ProductFormModal from "../../components/admin/ProductFormModal";
import { addProduct, updateProduct, deleteProduct } from "../../features/products/productsSlice";
import { formatCurrency } from "../../utils/formatters";
import { categories as seedCategories } from "../../data/categories";
import { brands as seedBrands } from "../../data/brands";

const PAGE_SIZE = 8;

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const categories = useSelector((state) => state.categories?.items || seedCategories);
  const brands = useSelector((state) => state.brands?.items || seedBrands);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => products.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || p.category === category)
  ), [products, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openModal = (product = null) => {
    setSelected(product);
    const element = document.getElementById("productFormModal");
    Modal.getOrCreateInstance(element).show();
  };

  const saveProduct = (payload) => {
    if (selected) {
      dispatch(updateProduct({ ...payload, id: selected.id }));
      toast.success("Product updated successfully");
    } else {
      dispatch(addProduct(payload));
      toast.success("Product added successfully");
    }
    Modal.getOrCreateInstance(document.getElementById("productFormModal")).hide();
  };

  const confirmDelete = async (product) => {
    const result = await Swal.fire({
      title: "Delete product?",
      text: `Are you sure you want to delete "${product.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
    });
    if (result.isConfirmed) {
      dispatch(deleteProduct(product.id));
      toast.success("Product deleted");
      if (page > 1 && pageItems.length === 1) setPage(page - 1);
    }
  };

  return (
    <div className="container-fluid py-4">
      <PageHeader title="Products" subtitle={`Manage your store products · ${products.length} total`}
        action={<button className="btn btn-primary" onClick={() => openModal()}><FiPlus className="me-2" />Add Product</button>} />
      <div className="admin-filter-card mb-3">
        <div className="row g-3">
          <div className="col-md-8"><div className="input-group"><span className="input-group-text bg-white"><FiSearch /></span><input className="form-control border-start-0" placeholder="Search product name..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} /></div></div>
          <div className="col-md-4"><select className="form-select" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}><option value="All">All Categories</option>{categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
        </div>
      </div>
      <div className="admin-table-card table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Featured</th><th className="text-end">Actions</th></tr></thead>
          <tbody>
            {pageItems.map((p) => <tr key={p.id}>
              <td><div className="d-flex align-items-center gap-3"><img src={p.image} alt="" className="admin-product-thumb" /><div><strong>{p.name}</strong><small className="d-block text-muted">{p.brand || "No brand"}</small></div></div></td>
              <td>{p.category}</td><td><strong>{formatCurrency(p.price)}</strong>{p.oldPrice > p.price && <del className="d-block small text-muted">{formatCurrency(p.oldPrice)}</del>}</td>
              <td><span className={`badge text-bg-${p.stock <= 5 ? "danger" : p.stock <= 15 ? "warning" : "success"}`}>{p.stock} in stock</span></td>
              <td>{p.featured ? <span className="badge text-bg-primary">Featured</span> : <span className="text-muted">—</span>}</td>
              <td><div className="d-flex justify-content-end gap-2"><button className="btn btn-sm btn-light text-primary" title="Edit" onClick={() => openModal(p)}><FiEdit2 /></button><button className="btn btn-sm btn-light text-danger" title="Delete" onClick={() => confirmDelete(p)}><FiTrash2 /></button></div></td>
            </tr>)}
            {!pageItems.length && <tr><td colSpan="6" className="text-center py-5 text-muted">No products found.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2"><small className="text-muted">Showing {filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} products</small><div className="btn-group"><button className="btn btn-outline-secondary btn-sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button><button className="btn btn-outline-secondary btn-sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button></div></div>
      <ProductFormModal product={selected} categories={categories} brands={brands} onSave={saveProduct} />
    </div>
  );
}
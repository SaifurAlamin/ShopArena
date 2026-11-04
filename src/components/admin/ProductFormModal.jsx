import { useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { FiImage } from "react-icons/fi";

const emptyForm = {
  name: "", category: "", brand: "", price: "", oldPrice: "",
  rating: "4.5", stock: "", image: "", description: "", featured: false,
};

export default function ProductFormModal({ product, categories, brands, onSave, modalId = "productFormModal" }) {
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (product) {
      const next = { ...emptyForm, ...product };
      setForm(next);
      setPreview(product.image || "");
    } else {
      setForm(emptyForm);
      setPreview("");
    }
  }, [product]);

  const change = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice || 0),
      rating: Number(form.rating || 0),
      stock: Number(form.stock || 0),
      image: form.image.trim() || "https://placehold.co/600x400?text=Product",
    });
  };

  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content border-0 rounded-4">
          <form onSubmit={submit}>
            <div className="modal-header">
              <h5 className="modal-title fw-bold">{product ? "Edit Product" : "Add New Product"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Product Name *</label>
                  <input className="form-control" required value={form.name} onChange={(e) => change("name", e.target.value)} placeholder="Enter product name" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Category *</label>
                  <select className="form-select" required value={form.category} onChange={(e) => change("category", e.target.value)}>
                    <option value="">Select category</option>
                    {categories.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Brand</label>
                  <select className="form-select" value={form.brand} onChange={(e) => change("brand", e.target.value)}>
                    <option value="">Select brand</option>
                    {brands.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Image URL</label>
                  <input className="form-control" value={form.image} onChange={(e) => { change("image", e.target.value); setPreview(e.target.value); }} placeholder="https://example.com/image.jpg" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Selling Price (BDT) *</label>
                  <input type="number" min="0" className="form-control" required value={form.price} onChange={(e) => change("price", e.target.value)} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Old Price (BDT)</label>
                  <input type="number" min="0" className="form-control" value={form.oldPrice} onChange={(e) => change("oldPrice", e.target.value)} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Stock Quantity *</label>
                  <input type="number" min="0" className="form-control" required value={form.stock} onChange={(e) => change("stock", e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Rating</label>
                  <input type="number" min="0" max="5" step="0.1" className="form-control" value={form.rating} onChange={(e) => change("rating", e.target.value)} />
                </div>
                <div className="col-md-6 d-flex align-items-end">
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="featuredProduct" checked={!!form.featured} onChange={(e) => change("featured", e.target.checked)} />
                    <label className="form-check-label" htmlFor="featuredProduct">Show as featured product</label>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" value={form.description || ""} onChange={(e) => change("description", e.target.value)} placeholder="Product description..." />
                </div>
                <div className="col-12">
                  <label className="form-label d-block">Image Preview</label>
                  {preview ? <img src={preview} alt="Product preview" className="admin-image-preview" onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400?text=Invalid+Image"; }} /> : <div className="admin-image-placeholder"><FiImage size={28} /><span>No image selected</span></div>}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary">{product ? "Update Product" : "Save Product"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
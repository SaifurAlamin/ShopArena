import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { toast } from "react-toastify";
import PageHeader from "../../components/common/PageHeader";
import { addCategory, updateCategory, deleteCategory } from "../../features/categories/categoriesSlice";

const blank = { name: "", icon: "🛍️", image: "" };

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);

  const open = (item = null) => {
    setEditing(item);
    setForm(item ? { name: item.name, icon: item.icon || "🛍️", image: item.image || "" } : blank);
    Modal.getOrCreateInstance(document.getElementById("categoryModal")).show();
  };

  const save = (e) => {
    e.preventDefault();
    if (editing) dispatch(updateCategory({ ...form, id: editing.id }));
    else dispatch(addCategory(form));
    Modal.getOrCreateInstance(document.getElementById("categoryModal")).hide();
    toast.success(editing ? "Category updated" : "Category added");
  };

  const remove = async (item) => {
    const result = await Swal.fire({ title: "Delete category?", text: item.name, icon: "warning", showCancelButton: true, confirmButtonColor: "#dc3545", confirmButtonText: "Delete" });
    if (result.isConfirmed) {
      dispatch(deleteCategory(item.id));
      toast.success("Category deleted");
    }
  };

  return <div className="container-fluid py-4">
    <PageHeader title="Categories" subtitle={`${categories.length} categories`} action={<button className="btn btn-primary" onClick={() => open()}><FiPlus className="me-2" />Add Category</button>} />
    <div className="row g-3">{categories.map((item) => <div className="col-sm-6 col-lg-4 col-xl-3" key={item.id}><div className="admin-category-card"><div className="d-flex align-items-center gap-3"><div className="category-icon">{item.icon || "🛍️"}</div><div className="flex-grow-1"><strong>{item.name}</strong><small className="d-block text-muted">Category</small></div></div><div className="d-flex gap-2 mt-3"><button className="btn btn-sm btn-outline-primary flex-grow-1" onClick={() => open(item)}><FiEdit2 className="me-1" />Edit</button><button className="btn btn-sm btn-outline-danger" onClick={() => remove(item)}><FiTrash2 /></button></div></div></div>)}</div>
    <div className="modal fade" id="categoryModal" tabIndex="-1"><div className="modal-dialog"><div className="modal-content border-0 rounded-4"><form onSubmit={save}><div className="modal-header"><h5 className="modal-title fw-bold">{editing ? "Edit Category" : "Add Category"}</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div><div className="modal-body"><label className="form-label">Category Name *</label><input className="form-control mb-3" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><label className="form-label">Icon / Emoji</label><input className="form-control mb-3" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /><label className="form-label">Image URL</label><input className="form-control" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div><div className="modal-footer"><button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button><button className="btn btn-primary">{editing ? "Update" : "Save"}</button></div></form></div></div></div>
  </div>;
}
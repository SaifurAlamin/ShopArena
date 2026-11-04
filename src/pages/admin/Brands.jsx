import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { toast } from "react-toastify";
import PageHeader from "../../components/common/PageHeader";
import { addBrand, updateBrand, deleteBrand } from "../../features/brands/brandsSlice";

export default function Brands() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands.items);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);

  const open = (item = null) => {
    setEditing(item);
    setName(item?.name || "");
    Modal.getOrCreateInstance(document.getElementById("brandModal")).show();
  };

  const save = (e) => {
    e.preventDefault();
    if (editing) dispatch(updateBrand({ id: editing.id, name }));
    else dispatch(addBrand({ name }));
    Modal.getOrCreateInstance(document.getElementById("brandModal")).hide();
    toast.success(editing ? "Brand updated" : "Brand added");
  };

  const remove = async (item) => {
    const result = await Swal.fire({ title: "Delete brand?", text: item.name, icon: "warning", showCancelButton: true, confirmButtonColor: "#dc3545", confirmButtonText: "Delete" });
    if (result.isConfirmed) {
      dispatch(deleteBrand(item.id));
      toast.success("Brand deleted");
    }
  };

  return <div className="container-fluid py-4">
    <PageHeader title="Brands" subtitle={`${brands.length} brands`} action={<button className="btn btn-primary" onClick={() => open()}><FiPlus className="me-2" />Add Brand</button>} />
    <div className="admin-table-card table-responsive"><table className="table align-middle mb-0"><thead><tr><th>#</th><th>Brand Name</th><th className="text-end">Actions</th></tr></thead><tbody>{brands.map((item, index) => <tr key={item.id}><td>{index + 1}</td><td><strong>{item.name}</strong></td><td><div className="d-flex justify-content-end gap-2"><button className="btn btn-sm btn-light text-primary" onClick={() => open(item)}><FiEdit2 /></button><button className="btn btn-sm btn-light text-danger" onClick={() => remove(item)}><FiTrash2 /></button></div></td></tr>)}</tbody></table>{!brands.length && <p className="text-center text-muted py-4">No brands found.</p>}</div>
    <div className="modal fade" id="brandModal" tabIndex="-1"><div className="modal-dialog"><div className="modal-content border-0 rounded-4"><form onSubmit={save}><div className="modal-header"><h5 className="modal-title fw-bold">{editing ? "Edit Brand" : "Add Brand"}</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div><div className="modal-body"><label className="form-label">Brand Name *</label><input className="form-control" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter brand name" /></div><div className="modal-footer"><button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancel</button><button className="btn btn-primary">{editing ? "Update" : "Save"}</button></div></form></div></div></div>
  </div>;
}
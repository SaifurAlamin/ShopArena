import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Account() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const submit = (e) => {
    e.preventDefault();
    signIn({ name, email, role: "customer" });
    toast.success("Demo login successful");
  };

  return <div className="container py-5"><div className="row justify-content-center"><div className="col-md-6"><div className="summary-card"><h2 className="fw-bold mb-4">My Account</h2>{isAuthenticated ? <><p>Welcome, <strong>{user.name}</strong></p><p>{user.email}</p><button className="btn btn-outline-danger" onClick={() => { signOut(); toast.info("Logged out"); }}>Logout</button></> : <form onSubmit={submit}><div className="mb-3"><label className="form-label">Name</label><input className="form-control" required value={name} onChange={(e) => setName(e.target.value)} /></div><div className="mb-3"><label className="form-label">Email</label><input className="form-control" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div><button className="btn btn-primary w-100">Demo Login</button><small className="text-muted d-block mt-3">Frontend demo only. Real authentication will be connected to the backend later.</small></form>}</div></div></div></div>;
}
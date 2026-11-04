import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="site-footer mt-5">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <Link to="/" className="brand text-white">Shop<span>Arena</span></Link>
            <p className="text-white-50 mt-3">A simple and convenient way to shop your everyday essentials.</p>
          </div>
          <div className="col-6 col-md-2">
            <h6>Quick Links</h6>
            <Link to="/products">Shop</Link><Link to="/categories">Categories</Link><Link to="/account">My Account</Link>
          </div>
          <div className="col-6 col-md-2">
            <h6>Help</h6>
            <a href="mailto:support@ShopArena.test">Contact Us</a><Link to="/orders">Track Order</Link><a href="#returns">Returns</a>
          </div>
          <div className="col-md-4">
            <h6>Stay Connected</h6>
            <p className="text-white-50">Follow us for offers and updates.</p>
            <div className="d-flex gap-3 fs-5"><FiFacebook /><FiInstagram /><FiTwitter /></div>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="text-center text-white-50 small">© {new Date().getFullYear()} ShopArena. Demo frontend project.</div>
      </div>
    </footer>
  );
}
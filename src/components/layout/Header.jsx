import { Link, NavLink } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import { useSelector } from "react-redux";

export default function Header() {
  const { itemCount } = useCart();
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  return (
    <>
      <div className="top-strip py-2">
        <div className="container d-flex justify-content-between small">
          <span>Welcome to ShopArena — your everyday shopping destination</span>
          <span className="d-none d-md-inline">Customer Support: +8801837-697104</span>
        </div>
      </div>
      <header className="bg-white border-bottom sticky-top">
        <div className="container py-3">
          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="brand me-lg-3">Shop<span>Arena</span></Link>
            <form className="search-box flex-grow-1 d-none d-md-flex" onSubmit={(e) => e.preventDefault()}>
              <input className="form-control" placeholder="Search for products..." />
              <button className="btn btn-primary" type="submit"><FiSearch /></button>
            </form>
            <div className="ms-auto d-flex align-items-center gap-3">
              <Link to="/wishlist" className="header-action position-relative" aria-label="Wishlist">
                <FiHeart size={21} /><span className="counter">{wishlistCount}</span>
              </Link>
              <Link to="/cart" className="header-action position-relative" aria-label="Cart">
                <FiShoppingCart size={22} /><span className="counter">{itemCount}</span>
              </Link>
              <Link to="/account" className="header-action" aria-label="Account"><FiUser size={22} /></Link>
            </div>
          </div>
          <nav className="main-nav d-flex gap-4 mt-3">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/products">Shop</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/orders">My Orders</NavLink>
          </nav>
        </div>
      </header>
    </>
  );
}
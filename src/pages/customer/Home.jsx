import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { toast } from "react-toastify";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import { useCart } from "../../hooks/useCart";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";
import { formatCurrency } from "../../utils/formatters";
import { getDiscountPercentage } from "../../utils/helpers";

function ProductCard({ product }) {
  const { add } = useCart();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAdd = () => {
    add(product);
    toast.success("Product added to cart");
  };

  return (
    <div className="product-card h-100">
      <div className="product-image-wrap">
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} className="product-image" />
        </Link>
        {product.oldPrice > product.price && <span className="discount-tag">{getDiscountPercentage(product.price, product.oldPrice)}% OFF</span>}
        <button className={`wishlist-btn ${isWishlisted ? "active" : ""}`} onClick={() => dispatch(toggleWishlist(product))} aria-label="Toggle wishlist">
          <FiHeart />
        </button>
      </div>
      <div className="p-3">
        <div className="small text-muted">{product.category}</div>
        <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
        <div className="d-flex align-items-center gap-1 small text-warning my-2"><FiStar fill="currentColor" /> <span className="text-muted">{product.rating}</span></div>
        <div className="d-flex align-items-center gap-2 mb-3">
          <strong className="text-primary">{formatCurrency(product.price)}</strong>
          {product.oldPrice > product.price && <del className="small text-muted">{formatCurrency(product.oldPrice)}</del>}
        </div>
        <button className="btn btn-outline-primary btn-sm w-100" onClick={handleAdd}><FiShoppingBag className="me-2" />Add to Cart</button>
      </div>
    </div>
  );
}

export default function Home() {
  const featured = products.filter((product) => product.featured);
  return (
    <>

      <section className="hero-section">
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div className="carousel-inner">

            {/* Slide 1 */}
            <div className="carousel-item active">
              <div className="container">
                <div className="row align-items-center min-vh-50">
                  <div className="col-lg-6 py-5">
                    <span className="hero-kicker">
                      THE EVERYDAY SHOPPING STORE
                    </span>

                    <h1 className="display-4 fw-bold mt-3">
                      Find your next <span>favorite</span> thing.
                    </h1>

                    <p className="text-secondary fs-5 mt-3">
                      Discover quality products, great prices,
                      and a smoother shopping experience.
                    </p>

                    <Link to="/products" className="btn btn-primary btn-lg mt-3">
                      Explore Products <FiArrowRight className="ms-2" />
                    </Link>
                  </div>

                  <div className="col-lg-6 text-center">
                    <img
                      className="hero-image"
                      src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900"
                      alt="Shopping collection"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <div className="container">
                <div className="row align-items-center min-vh-50">
                  <div className="col-lg-6 py-5">
                    <span className="hero-kicker">
                      SPECIAL SHOPPING OFFER
                    </span>

                    <h1 className="display-4 fw-bold mt-3">
                      Enjoy Up To <span>50% OFF</span>
                    </h1>

                    <p className="text-secondary fs-5 mt-3">
                      Shop your favorite products at amazing prices.
                      Don't miss our limited-time offers.
                    </p>

                    <Link to="/products" className="btn btn-primary btn-lg mt-3">
                      Shop Sale <FiArrowRight className="ms-2" />
                    </Link>
                  </div>

                  <div className="col-lg-6 text-center">
                    <img
                      className="hero-image"
                      src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900"
                      alt="Special shopping offers"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <div className="container">
                <div className="row align-items-center min-vh-50">
                  <div className="col-lg-6 py-5">
                    <span className="hero-kicker">
                      NEW COLLECTION
                    </span>

                    <h1 className="display-4 fw-bold mt-3">
                      Discover What's <span>New.</span>
                    </h1>

                    <p className="text-secondary fs-5 mt-3">
                      Explore our latest arrivals and find something
                      special for your everyday life.
                    </p>

                    <Link to="/products" className="btn btn-primary btn-lg mt-3">
                      Discover Now <FiArrowRight className="ms-2" />
                    </Link>
                  </div>

                  <div className="col-lg-6 text-center">
                    <img
                      className="hero-image"
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900"
                      alt="New fashion collection"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Previous */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
            aria-label="Previous slide"
          >
            <span className="carousel-control-prev-icon" />
          </button>

          {/* Next */}
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
            aria-label="Next slide"
          >
            <span className="carousel-control-next-icon" />
          </button>

          {/* Indicators */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" />
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" />
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" />
          </div>

        </div>
      </section>


      <section className="container py-5">
        <div className="section-heading">
          <div><span className="section-kicker">BROWSE COLLECTIONS</span><h2>Shop by Category</h2></div>
          <Link to="/categories">View all <FiArrowRight /></Link>
        </div>
        <div className="row g-3">
          {categories.map((category) => (
            <div className="col-6 col-md-4 col-lg-2" key={category.id}>
              <Link to={`/products?category=${encodeURIComponent(category.name)}`} className="category-card">
                <img src={category.image} alt={category.name} />
                <span>{category.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-5">
        <div className="section-heading">
          <div><span className="section-kicker">HANDPICKED FOR YOU</span><h2>Featured Products</h2></div>
          <Link to="/products">Shop all <FiArrowRight /></Link>
        </div>
        <div className="row g-4">
          {featured.map((product) => <div className="col-6 col-md-4 col-lg-3" key={product.id}><ProductCard product={product} /></div>)}
        </div>
      </section>

      <section className="container pb-5">
        <div
          id="promoCarousel"
          className="carousel slide promo-carousel"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#promoCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Sale offer" />
            <button type="button" data-bs-target="#promoCarousel" data-bs-slide-to="1" aria-label="New arrivals" />
            <button type="button" data-bs-target="#promoCarousel" data-bs-slide-to="2" aria-label="Special deals" />
          </div>

          <div className="carousel-inner">
            {/* Slide 1 - Sale */}
            <div className="carousel-item active">
              <div className="promo-slide promo-sale">
                <div className="row align-items-center w-100">
                  <div className="col-lg-6 promo-content">
                    <span className="promo-kicker">LIMITED TIME OFFER</span>
                    <h2>Get Up To <span>50% OFF</span></h2>
                    <p>Enjoy amazing discounts on your favorite products. Shop now before the offer ends!</p>
                    <Link to="/products" className="btn promo-btn">Shop Now <FiArrowRight className="ms-2" /></Link>
                  </div>
                  <div className="col-lg-6 promo-image">
                    <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900" alt="Special sale offer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2 - New Arrivals */}
            <div className="carousel-item">
              <div className="promo-slide promo-arrivals">
                <div className="row align-items-center w-100">
                  <div className="col-lg-6 promo-content">
                    <span className="promo-kicker">FRESH DROPS</span>
                    <h2>Explore <span>New Arrivals</span></h2>
                    <p>Be the first to check out our latest collection of high-quality items curated just for you.</p>
                    <Link to="/products" className="btn promo-btn">Discover <FiArrowRight className="ms-2" /></Link>
                  </div>
                  <div className="col-lg-6 promo-image">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900" alt="New arrivals" />
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3 - Special Deals */}
            <div className="carousel-item">
              <div className="promo-slide promo-deals">
                <div className="row align-items-center w-100">
                  <div className="col-lg-6 promo-content">
                    <span className="promo-kicker">EXCLUSIVE DEALS</span>
                    <h2>Best Prices <span>Guaranteed</span></h2>
                    <p>Grab top-rated items with massive price drops and exclusive bundle offers available today.</p>
                    <Link to="/products" className="btn promo-btn">View Deals <FiArrowRight className="ms-2" /></Link>
                  </div>
                  <div className="col-lg-6 promo-image">
                    <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900" alt="Special deals" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Previous */}
          <button className="carousel-control-prev" type="button" data-bs-target="#promoCarousel" data-bs-slide="prev" aria-label="Previous slide">
            <span className="carousel-control-prev-icon" />
          </button>

          {/* Next */}
          <button className="carousel-control-next" type="button" data-bs-target="#promoCarousel" data-bs-slide="next" aria-label="Next slide">
            <span className="carousel-control-next-icon" />
          </button>
        </div>
      </section>
    </>
  );
}
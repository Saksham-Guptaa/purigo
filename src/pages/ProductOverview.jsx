import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useCart } from "../context/CartContext";
import ErrorPage from "./404";
import ItemCard from "../components/ItemCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";




const ProductOverview = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const { findProductById, loading, products, isLoggedIn } = useFirebase();
  const [product, setProduct] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await findProductById(id);
        setProduct(productData);
        document.title = `Buy ${productData.title} | Purigo`;

        const mangoPickleData = {
          "@context": "http://schema.org",
          "@type": "Product",
          name: productData.title,
          image: productData.images[0],
          description: productData.description,
          brand: {
            "@type": "Brand",
            name: "Purigo",
          },
          offers: {
            "@type": "Offer",
            url: `https://purigo.netlify.app/products/${productData.slug}`,
            priceCurrency: "INR",
            price: productData.price,
            priceValidUntil: "2025-12-31",
            itemCondition: `https://purigo.netlify.app/products/${productData.slug}`,
            availability: `https://purigo.netlify.app/products/${productData.slug}`,
          },
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(mangoPickleData);
        document.head.appendChild(script);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    getProduct();
  }, [id]);

  useEffect(() => {
    const cachedReviewCount = localStorage.getItem("reviewCount" + id);

    if (cachedReviewCount) {
      setReviewCount(parseInt(cachedReviewCount));
    } else {
      const randomReviewCount = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
      setReviewCount(randomReviewCount);
      localStorage.setItem("reviewCount" + id, randomReviewCount.toString());
    }
  }, [id]);

  useEffect(() => {
    const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
    const randomSubset = shuffledProducts.slice(0, 4);
    setRandomProducts(randomSubset);
  }, [products]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    if (quantity < 1) {
      alert("Please select a valid quantity.");
      return;
    }
    addToCart({
      id,
      title: product.title,
      size: selectedSize,
      price: product[selectedSize] || product.price,
      quantity,
      image: product.images[0],
      href: id,
    });
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (!loading && !isLoggedIn) {
      navigate("/account/login", { state: { from: location } });
    } else {
      if (!selectedSize) {
        alert("Please select a size.");
        return;
      }
      if (quantity < 1) {
        alert("Please select a valid quantity.");
        return;
      }

      const item = {
        id,
        title: product.title,
        size: selectedSize,
        price: product[selectedSize] || product.price,
        quantity,
        image: product.images[0],
        href: id,
      };

      navigate("/account/checkout/buy-now", { state: { item } });
    }
  };

  const scrollRef = useRef(null);

  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 250,
        behavior: "smooth",
      });
    }
  };

  const scrollToPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -250,
        behavior: "smooth",
      });
    }
  };

  if (loading)
    return (
      <div className="font-sans p-8 tracking-wide max-lg:max-w-2xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images Skeleton */}
          <div className="space-y-4 lg:sticky lg:top-8">
            {/* Product Image Skeleton */}
            <div className="bg-gray-200 p-4 flex items-center sm:h-[500px] rounded-lg overflow-hidden animate-pulse"></div>
            {/* Additional Product Images Skeleton */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 p-4 flex items-center rounded-lg sm:h-[250px] overflow-hidden animate-pulse"></div>
              <div className="bg-gray-200 p-4 flex items-center rounded-lg sm:h-[250px] overflow-hidden animate-pulse"></div>
              <div className="bg-gray-200 p-4 flex items-center rounded-lg sm:h-[250px] overflow-hidden animate-pulse"></div>
              <div className="bg-gray-200 p-4 flex items-center rounded-lg sm:h-[250px] overflow-hidden animate-pulse"></div>
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="max-w-xl">
            {/* Product Title Skeleton */}
            <h2 className="text-4xl font-extrabold text-gray-800 font-serif w-3/4 bg-gray-200 h-8 rounded animate-pulse"></h2>
            {/* Product Description Skeleton */}
            <p className="text-sm text-gray-600 mt-2 w-full bg-gray-200 h-5 rounded animate-pulse"></p>

            {/* Product Rating Skeleton */}
            <div className="flex items-center space-x-1 mt-2">
              {/* Rating Stars Skeleton */}
              <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
              {/* Review Count Skeleton */}
              <div style={{ fontSize: "0.75rem" }}></div>
            </div>

            {/* Product Price Skeleton */}
            <h3 className="text-2xl font-bold text-gray-800 mt-4 w-2/4 bg-gray-200 h-7 rounded animate-pulse"></h3>
            <p className="text-xs w-1/4 bg-gray-200 h-3 rounded animate-pulse">
              {/* GST and All Taxes are inclusive */}
            </p>

            {/* Size Options Skeleton */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800 w-2/4 bg-gray-200 h-7 rounded animate-pulse">
                {/* Choose a Size */}
              </h3>
              <div className="flex flex-wrap gap-4 mt-2">
                {/* Size Buttons Skeleton */}
                <button className="w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center text-sm animate-pulse"></button>
                <button className="w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center text-sm animate-pulse"></button>
                <button className="w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center text-sm animate-pulse"></button>
              </div>
            </div>

            {/* Quantity Selector Skeleton */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800 w-2/4 bg-gray-200 h-7 rounded animate-pulse">
                {/* Quantity */}
              </h3>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center text-2xl animate-pulse"></div>
                <div className="text-lg w-16 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center text-2xl animate-pulse"></div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-wrap gap-4 mt-8">
              {/* Buy Now Button Skeleton */}
              <button className="min-w-[200px] px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-200 text-sm font-semibold rounded animate-pulse"></button>
              {/* Add to Cart Button Skeleton */}
              <button className="min-w-[200px] px-4 py-2.5 border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-200 text-sm font-semibold rounded animate-pulse"></button>
            </div>
          </div>
        </div>

        {/* Similar Products Section Skeleton */}
        <section className="py-12 sm:py-16 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Title Skeleton */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 lg:mb-0 dark:text-white w-1/3 bg-gray-200 h-7 rounded animate-pulse"></h2>
            {/* Similar Products Grid Skeleton */}
            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12 overflow-x-auto">
              {/* Render Similar Products Skeleton */}
              <div className="bg-gray-200 p-8 rounded animate-pulse"></div>
              <div className="bg-gray-200 p-8 rounded animate-pulse"></div>
              <div className="bg-gray-200 p-8 rounded animate-pulse"></div>
              <div className="bg-gray-200 p-8 rounded animate-pulse"></div>
            </div>
          </div>
        </section>
      </div>
    );

  if (!product) return <ErrorPage />;

  return (
    <div className="font-sans p-8 tracking-wide bg-[#FFF3E2] max-lg:max-w-2xl mx-auto">
      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="space-y-4 bg-[#FFF3E2] lg:sticky lg:top-8">
          {/* Product Image */}
          <div className="bg-transparent p-4 flex bg-[#FFF3E2] items-center sm:h-[500px] rounded-lg overflow-hidden">
            <img
              src={product.images[0]}
              alt="Product"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Additional Product Images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 flex items-center rounded-lg sm:h-[250px] overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Product ${index + 2}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="max-w-xl">
          {/* Product Title */}
          <h2 className="text-4xl font-extrabold text-gray-800 font-serif">
            {product.title}
          </h2>
          {/* Product Description */}
          <p className="text-sm text-gray-600 mt-2">{product.description}</p>

          {/* Product Rating */}
          <div className="flex items-center space-x-1 mt-2">
            {/* Rating Stars */}
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-3 ${
                  index < 4 ? "fill-gray-800" : "fill-[#CED5D8]"
                }`}
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
            ))}
            {/* Review Count */}
            <div style={{ fontSize: "0.75rem" }}>({reviewCount})</div>
          </div>

          {/* Product Price */}
          <h3 className="text-2xl font-bold text-gray-800 mt-4">
            Rs. {selectedSize ? product[selectedSize] : product.price}
          </h3>
          <p className="text-xs">GST and All Taxes are inclusive</p>

          {/* Size Options */}
          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-800">Choose a Size</h3>
            <div className="flex flex-wrap gap-4 mt-2">
              {/* Size Buttons */}
              {product.twofifty && (
                <button
                  type="button"
                  className={`w-12 h-12 border-2 hover:border-gray-800 font-semibold text-sm rounded-full flex items-center justify-center ${
                    selectedSize === "twofifty"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize("twofifty")}
                >
                  250g
                </button>
              )}
              {product.fivehundred && (
                <button
                  type="button"
                  className={`w-12 h-12 border-2 hover:border-gray-800 font-semibold text-sm rounded-full flex items-center justify-center ${
                    selectedSize === "fivehundred"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize("fivehundred")}
                >
                  500g
                </button>
              )}
              {product.onekg && (
                <button
                  type="button"
                  className={`w-12 h-12 border-2 hover:border-gray-800 font-semibold text-sm rounded-full flex items-center justify-center ${
                    selectedSize === "onekg"
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize("onekg")}
                >
                  1kg
                </button>
              )}
            </div>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* Quantity Selector */}
          <div className="mt-4">
            <h3 className="text-lg font-bold text-gray-800">Quantity</h3>
            <div className="flex items-center gap-4 mt-4">
              <button
                type="button"
                className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-2xl"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                type="button"
                className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-2xl"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              type="button"
              className="min-w-[200px] px-4 py-3 bg-[#FF6F3D] hover:bg-[#FFA62F]   dark:hover:bg-[#FF6F3D] focus:outline-none focus:ring-4 focus:ring-[#FF6F3D] dark:focus:ring-[#FFA62F] text-white text-sm font-semibold rounded"
            >
              Buy now
            </button>
            {/* Add to Cart Button */}
            <button
              type="button"
              className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <section className="dark:bg-gray-900 py-8 sm:py-10 lg:py-12 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="max-w-2xl lg:max-w-full justify-center flex items-center mb-4">
              <img
                src="https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Line.png?v=1711450464"
                alt="Divider"
                className="h-px sm:h-1 mr-2 sm:mr-3"
              />
              <h2 className="text-lg sm:text-base font-bold text-[#382C23] dark:text-white">
              Similar Items You Might Like
              </h2>
              <img
                src="https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Line.png?v=1711450464"
                alt="Divider"
                className="h-px sm:h-1 ml-2 sm:ml-3"
              />
            </div>
            <div
              className="mt-6 overflow-x-auto whitespace-nowrap scrollbar-hide"
              ref={scrollRef}
            >
              <div className="inline-flex space-x-6 lg:space-x-12">
                {randomProducts.slice(0, 4).map((product) => (
                  <div
                    key={product.slug}
                    className="flex-shrink-0 w-64 md:w-72 lg:w-80"
                  >
                    <ItemCard item={product} />
                  </div>
                ))}
              </div>
            </div>
            {/* Navigation buttons */}
            <button
              onClick={scrollToPrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 text-gray-600 rounded-full p-2 focus:outline-none shadow-md"
            >
              <HiChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollToNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 text-gray-600 rounded-full p-2 focus:outline-none shadow-md"
            >
              <HiChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Similar Products Section */}
      {/* <section className="py-12 sm:py-16 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          {/* <h2 className="text-2xl font-bold text-gray-900 mb-6 lg:mb-0 dark:text-white"> */}
            {/* Similar Items You Might Like */}
          {/* </h2> */}
          {/* Similar Products Grid */}
          {/* <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"> */}
            {/* Render Similar Products */}
            {/* {randomProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="flex justify-center">
                <div className="max-w-xs sm:max-w-none w-full">
                  <ItemCard item={product} />
                </div>
              </div>
            ))}
          </div> */}
        {/* </div> */}
      {/* </section>  */}

    </div>
  );
};

export default ProductOverview;

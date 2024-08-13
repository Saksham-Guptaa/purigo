import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import ItemCardSkeleton from "../components/ItemCardSkeleton";

const SearchProducts = () => {
  const { products, loading } = useFirebase();
  const [searchQuery, setSearchQuery] = useState("");
  let count = 10;
  const skeletons = Array.from({ length: count }, (_, i) => i);

  // Filter products based on searchQuery (title, description, category)
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery === "") {
      document.title = "Search";
    } else {
      document.title = `Found ${filteredProducts.length} results for "${searchQuery}"`;
    }
  }, [searchQuery, filteredProducts.length]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-[#FFF3E2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          {searchQuery !== "" ? (
            <h2 className="text-2xl font-bold text-gray-900 mb-10">
              Found {filteredProducts.length} results for "{searchQuery}"
            </h2>
          ) : (
            <h2 className="text-2xl font-bold text-gray-900 mb-10">
              Search our store
            </h2>
          )}

          {/* Search form */}
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          {/* Product grid or skeleton loaders */}
          <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
            {loading ? (
              skeletons.map((index) => <ItemCardSkeleton key={index} />)
            ) : filteredProducts.length === 0 ? (
              <p className="text-gray-600 text-lg text-center">
                No products found.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <ItemCard key={product.slug} item={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;

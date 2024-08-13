import React, { useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import ItemCardSkeleton from "../components/ItemCardSkeleton";

const AllProducts = () => {
  const { products, loading } = useFirebase();
  let count = 10;
  const skeletons = Array.from({ length: count }, (_, i) => i);

  useEffect(() => {
    document.title = "Complete Pickle Collection at Purigo"
  }, [])

  return (
    <div className="bg-white text-black">
      {loading ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
            <div className="mt-6 grid gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
              {skeletons.map((index) => (
                <ItemCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <div className="max-w-2xl lg:max-w-full flex justify-center items-center mb-4">
              <img
                src="https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Line.png?v=1711450464"
                alt="Divider"
                className="h-px sm:h-1 mr-2 sm:mr-3"
              />
              <h2 className="text-lg sm:text-base font-bold text-[#000000]">
                All Products
              </h2>
              <img
                src="https://cdn.shopify.com/s/files/1/0653/2605/5654/files/Line.png?v=1711450464"
                alt="Divider"
                className="h-px sm:h-1 ml-2 sm:ml-3"
              />
            </div>
            <div className="mt-6 grid gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
              {products.map((product) => (
                <ItemCard key={product.slug} item={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Loader from "../components/Loader";
import ErrorPage from "./404";

const AdminProduct = () => {
  const { products, loading, user } = useFirebase();
  useEffect(() => {
    document.title = "Admin Dashboard"
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  return user && user.admin ? (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF3E2] dark:bg-gray-800">
      <div className="w-full max-w-6xl p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Products
          </h2>
          <Link
            to="/admin/addnewproduct"
            className="py-2 px-4 bg-[#FF6F3D] text-white rounded-lg hover:bg-[#FFA62F] dark:hover:bg-[#FF6F3D] focus:outline-none focus:ring-4 focus:ring-[#FF6F3D] dark:focus:ring-[#FFA62F]"
          >
            New Product
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">ID</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Title</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Category</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Price (250g)</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Price (500g)</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Price (1kg)</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Status</th>
                <th className="px-4 py-2 text-left text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.slug} className="bg-white dark:bg-gray-800">
                  <td className="border px-4 py-2 text-gray-900 dark:text-white">{product.slug}</td>
                  <td className="border px-4 py-2 text-gray-900 dark:text-white cursor-pointer">
                    {product.title}
                  </td>
                  <td className="border px-4 py-2 text-gray-900 dark:text-white">{product.category}</td>
                  <td className="border px-4 py-2 text-gray-900 dark:text-white">
                    {product.twofifty != null ? product.twofifty : "-"}
                  </td>
                  <td className="border px-4 py-2 text-gray-900 dark:text-white">
                    {product.fivehundred != null ? product.fivehundred : "-"}
                  </td>
                  <td className="border px-4 py-2 text-gray-900 dark:text-white">
                    {product.onekg != null ? product.onekg : "-"}
                  </td>
                  <td className="border px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                        product.status
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {product.status ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/addnewproduct/${product.slug}`}
                        className="py-1 px-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                      >
                        Edit
                      </Link>
                      <button className="py-1 px-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <ErrorPage />
  );
};

export default AdminProduct;

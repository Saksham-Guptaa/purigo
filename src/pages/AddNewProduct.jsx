import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import Loader from "../components/Loader";
import LoginPage from "./Login";
import { useParams } from "react-router-dom";

const AddNewProduct = () => {
  const { id } = useParams();
  const [selectedImages, setSelectedImages] = useState([]);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    "250g": "",
    "500g": "",
    "1kg": "",
    category: "",
  });

  useEffect(() => {
    document.title = "Admin | Add New Product"
  }, [])

  const { addNewProduct, user, loading, findProductById } = useFirebase();

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        try {
          const productData = await findProductById(id);
          if (productData) {
            setProduct(productData);
            setFormData({
              title: productData.title || "",
              price: productData.price || "",
              description: productData.description || "",
              "250g": productData["250g"] || "",
              "500g": productData["500g"] || "",
              "1kg": productData["1kg"] || "",
              category: productData.category || "",
            });
          }
        } catch (error) {
          console.error("Error fetching product:", error.message);
        }
      };

      getProduct();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNewProduct(
        formData.title,
        formData.price,
        formData.description,
        formData["250g"],
        formData["500g"],
        formData["1kg"],
        selectedImages,
        formData.category
      );
      setFormData({
        title: "",
        price: "",
        description: "",
        "250g": "",
        "500g": "",
        "1kg": "",
        category: "",
      });
      alert("success");
      setSelectedImages([]);
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  return user && user.admin ? (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF3E2] dark:bg-gray-800 p-4">
      <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Upload file
              <input
                type="file"
                className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 border rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                onChange={handleImageChange}
                multiple
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Choose images of the pickle
              </span>
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Title
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 border rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </label>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Category
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 border rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Price
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 border rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 border rounded-lg focus:outline-none resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              ></textarea>
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Price for 250g
                <input
                  type="text"
                  name="250g"
                  value={formData["250g"]}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 border rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </label>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Price for 500g
                <input
                  type="text"
                  name="500g"
                  value={formData["500g"]}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 border rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </label>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Price for 1kg
                <input
                  type="text"
                  name="1kg"
                  value={formData["1kg"]}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 border rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#FF6F3D] text-white rounded-lg hover:bg-[#FFA62F] dark:hover:bg-[#FF6F3D] focus:outline-none focus:ring-4 focus:ring-[#FF6F3D] dark:focus:ring-[#FFA62F]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <LoginPage />
  );
};

export default AddNewProduct;

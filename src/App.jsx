import { useState, useEffect } from "react";
import { Search, PlusCircle, ShoppingBag, Loader2 } from "lucide-react";

const API_BASE_URL = "https://mini-ecom-backend.onrender.com/api/products";

export default function App() {
  const [activeTab, setActiveTab] = useState("submit");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      showNotification("Failed to load products. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.price || !formData.description) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add product");

      const newProduct = await response.json();
      setProducts((prev) => [newProduct, ...prev]);

      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
      });

      showNotification("Product added successfully!", "success");

      // Switch to the products tab
      setActiveTab("products");
    } catch (error) {
      console.error("Error adding product:", error);
      showNotification("Failed to add product. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchProducts();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ term: searchTerm }),
      });
      console.log(response);
      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error searching products:", error);
      // showNotification("Search failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Handle key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Mini E-Commerce Platform</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-6 font-medium text-lg flex items-center gap-2 ${
              activeTab === "submit"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("submit")}
          >
            <PlusCircle size={20} />
            Product Submission
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg flex items-center gap-2 ${
              activeTab === "products"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("products")}
          >
            <ShoppingBag size={20} />
            My Products
          </button>
        </div>

        {/* Notification */}
        {notification.show && (
          <div
            className={`mb-6 p-4 rounded-md ${
              notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Product Submission Form */}
        {activeTab === "submit" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Add a New Product</h2>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter product name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe your product"
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        {activeTab === "products" && (
          <div>
            {/* Search Bar */}
            <div className="mb-6 flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Search
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 size={40} className="animate-spin text-indigo-600" />
              </div>
            )}

            {/* Products Grid */}
            {!loading && (
              <>
                {products.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow">
                    <ShoppingBag size={48} className="mx-auto text-gray-400" />
                    <h3 className="mt-4 text-xl font-medium text-gray-700">
                      No products found
                    </h3>
                    <p className="mt-2 text-gray-500">
                      {searchTerm
                        ? "Try a different search term"
                        : "Add your first product to get started"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                      >
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/api/placeholder/400/320";
                            }}
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <ShoppingBag size={48} className="text-gray-400" />
                          </div>
                        )}

                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {product.name}
                            </h3>
                            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2 py-1 rounded">
                              ${parseFloat(product.price).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Mini E-Commerce Platform</p>
        </div>
      </footer>
    </div>
  );
}

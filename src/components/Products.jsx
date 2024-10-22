import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Productvip component
function Productvip({ showCount, sortOption }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = showCount || 8; // Adjust products per page based on showCount

  // Fetch data from the dummy JSON API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show loading indicator while fetching
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  // Function to truncate the description
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Sorting logic based on sortOption
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "Price: Low to High") return a.price - b.price;
    if (sortOption === "Price: High to Low") return b.price - a.price;
    return 0; // Default sorting (no sort)
  });

  // Calculate the current products based on the current page and showCount
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product, index) => (
          <Link
            to={`/product/${product.id}`}
            key={index}
            className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600">
              {truncateText(product.description, 100)} {/* Limit description to 100 characters */}
            </p>
            <p className="text-red-500 font-bold">${product.price}</p>
            {product.rating && (
              <p className="text-green-500">Rating: {product.rating.rate}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-2 border rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Productvip;

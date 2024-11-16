import React, { useEffect, useState } from "react";
import ProductList from "./ProductList.jsx";
import { useNavigate } from "react-router-dom";
import "./Product.css";
import axios from 'axios';
import { API_ENDPOINT } from '../../../Constant.js';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

 
  // Redirect to login if not logged in
  useEffect(() => {
    if (!accessToken) {
      alert("You are not logged in. Redirecting to login page.");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  // Fetch products from backend on page load
  const fetchData = async () => {
    const accessToken = localStorage.getItem("accessToken");

 
    try {
      const response = await axios.get(`${API_ENDPOINT}/api/cars/mycars`, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`, // Pass token in Authorization header
        } // If using cookies
    });
    console.log(response.data);
      const responseData = response.data;
      setProducts(responseData);
      setFilteredProducts(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const handleproductClick = () => {
    navigate('/product-form');
  };

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    setFilteredProducts(
      products.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(lowerCaseSearchTerm)
          )
      )
    );
  }, [searchTerm, products]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");  // Remove token
    navigate("/login");  // Redirect to login page
  };

  return (
    <div className="product-list-page">
      <h1 style={{
       
          color: "white",
         
        }}>Your Car Collection</h1>
      <button
        style={{
          backgroundColor: "#d9534f",  // Red background for logout
          color: "white",
          border: "none",
          padding: "10px 15px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          position: "fixed",
          top: "20px",
          left: "20px",  // Position on the upper-left
          zIndex: 1000,
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#c9302c")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#d9534f")}
        onMouseDown={(e) => (e.target.style.backgroundColor = "#ac2925")}
        onMouseUp={(e) => (e.target.style.backgroundColor = "#c9302c")}
        onClick={handleLogout}
      >
        Logout
      </button>
      <input
        type="text"
        placeholder="Search by title, tags, or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
<button 
  style={{
    backgroundColor: "#4caf50",  // Green background
    color: "white",               // White text
    border: "none",               // Remove borders
    padding: "12px 20px",         // Add some padding
    textAlign: "center",          // Center the text
    textDecoration: "none",       // Remove underline
    display: "inline-block",      // Inline-block for proper spacing
    fontSize: "16px",             // Adjust font size
    margin: "10px 0",             // Add some margin
    cursor: "pointer",           // Change cursor to pointer on hover
    borderRadius: "5px",          // Rounded corners
    transition: "background-color 0.3s ease", // Smooth transition
    position: "fixed",            // Position the button relative to the viewport
    top: "20px",                  // Distance from the top of the page
    right: "20px",                // Distance from the right side of the page
    zIndex: 1000                  // Ensure it stays on top of other elements
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}  // Hover effect
  onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}   // Reset to original color
  onMouseDown={(e) => (e.target.style.backgroundColor = "#3e8e41")}  // Active effect
  onMouseUp={(e) => (e.target.style.backgroundColor = "#45a049")}    // Reset to hover effect
  onClick={handleproductClick}
>
  Add Product
</button>


      {filteredProducts.length > 0 ? (
  <ProductList products={filteredProducts} onProductClick={handleProductClick} />
) : (
  <p>No products found.</p>
)}

      </div>
  );
};

export default ProductListPage;

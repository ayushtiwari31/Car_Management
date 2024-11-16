import React from "react";
import ProductCard from "./ProductCard";
import "./Product.css";

const ProductList = ({ products, onProductClick }) => {
  return (
    <div className="product-list">
      {products.map((product,index) => (

        <ProductCard
          key={product._id||index}
          product={product}
          onClick={() => onProductClick(product._id)} 
        />
      ))}
    </div>
  );
};

export default ProductList;

import React from "react";
import { useCart } from "../contexts/CartContext";

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} image_url
 * @property {string} [created_at]
 */

/** @param {{ product: Product }} props */
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-pink-200 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <img
        src={
          product.image_url ||
          `https://placehold.co/600x400/E91E63/FFFFFF?text=${encodeURIComponent(
            product.name
          )}`
        }
        alt={`[Imagem de ${product.name}]`}
        className="w-full h-64 object-cover"
        onError={(e) => {
          const target = e.target;
          target.onerror = null;
          target.src = `https://placehold.co/600x400/CCCCCC/000000?text=Imagem+Indisponivel`;
        }}
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-pink-700 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 h-20 overflow-y-auto">
          {product.description}
        </p>
        <p className="text-xl font-bold text-pink-500 mb-4">
          €{product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

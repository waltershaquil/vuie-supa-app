import React, { useState, useEffect, createContext, useContext } from "react";

/**
 * @typedef {import('../components/ProductCard').Product} Product
 */

/**
 * @typedef {Object} CartItemExtendsProduct
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} image_url
 * @property {string} [created_at]
 * @property {number} quantity
 */

/**
 * @typedef {Object} CartContextType
 * @property {CartItemExtendsProduct[]} cart
 * @property {(product: Product) => void} addToCart
 * @property {(productId: string) => void} removeFromCart
 * @property {() => void} clearCart
 * @property {number} itemCount
 */

/** @type {React.Context<CartContextType | undefined>} */
const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("thriftCart");
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("thriftCart", JSON.stringify(cart));
  }, [cart]);

  /** @param {Product} product */
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /** @param {string} productId */
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

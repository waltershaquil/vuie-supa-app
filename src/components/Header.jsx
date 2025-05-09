import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { supabase } from "../supabaseClient"; // Importa o cliente Supabase

const Header = ({ setCurrentView }) => {
  const { itemCount } = useCart();
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAdminUser(session?.user ?? null);
    };
    // Verifica se o Supabase está configurado antes de buscar a sessão
    if (supabase.supabaseUrl && supabase.supabaseUrl !== "YOUR_SUPABASE_URL") {
      fetchSession();
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAdminUser(session?.user ?? null);
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentView("products");
  };

  return (
    <header className="bg-pink-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-3xl font-bold cursor-pointer"
          onClick={() => setCurrentView("products")}
        >
          Vuie boutique
        </h1>
        <nav className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView("products")}
            className="hover:text-pink-200 transition duration-150"
          >
            Produtos
          </button>
          <button
            onClick={() => setCurrentView("cart")}
            className="relative hover:text-pink-200 transition duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="ml-1">Carrinho</span>
          </button>
          {adminUser ? (
            <>
              <button
                onClick={() => setCurrentView("admin")}
                className="hover:text-pink-200 transition duration-150"
              >
                Admin Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-pink-700 hover:bg-pink-800 px-3 py-1 rounded transition duration-150"
              >
                Logout Admin
              </button>
            </>
          ) : (
            <button
              onClick={() => setCurrentView("adminLogin")}
              className="hover:text-pink-200 transition duration-150"
            >
              Login Admin
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

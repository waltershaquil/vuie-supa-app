import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const AdminProductList = ({ products, onProductRemoved }) => {
  const [error, setError] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);

  const handleRemove = async (productId) => {
    if (
      !window.confirm(
        "Tem certeza que deseja remover este produto? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }
    setLoadingProductId(productId);
    setError(null);

    if (supabase.supabaseUrl === "YOUR_SUPABASE_URL") {
      setError(
        "Supabase não configurado corretamente. Não é possível remover itens."
      );
      setLoadingProductId(null);
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from("products")
        .delete()
        .match({ id: productId });

      if (deleteError) {
        throw deleteError;
      }
      onProductRemoved();
    } catch (err) {
      console.error("Erro ao remover produto:", err);
      setError(err.message || "Não foi possível remover o produto.");
    } finally {
      setLoadingProductId(null);
    }
  };

  if (!products || products.length === 0) {
    return <p className="text-gray-600 mt-4">Não há produtos para gerir.</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-pink-700 mb-6">
        Gerir Itens Existentes
      </h3>
      {error && (
        <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md mb-4">
          {error}
        </p>
      )}
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h4 className="text-lg font-medium text-pink-600">
                {product.name}
              </h4>
              <p className="text-sm text-gray-500">
                €{product.price.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => handleRemove(product.id)}
              disabled={
                loadingProductId === product.id ||
                supabase.supabaseUrl === "YOUR_SUPABASE_URL"
              }
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150 disabled:bg-red-300"
            >
              {loadingProductId === product.id ? "A remover..." : "Remover"}
            </button>
          </div>
        ))}
      </div>
      {supabase.supabaseUrl === "YOUR_SUPABASE_URL" && (
        <p className="text-xs text-yellow-600 mt-4">
          Supabase não configurado. A remoção de itens está desativada.
        </p>
      )}
    </div>
  );
};

export default AdminProductList;

import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const AddItemForm = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!name || !description || !price || !imageUrl) {
      setError("Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setError("O preço deve ser um número positivo.");
      setLoading(false);
      return;
    }
    if (supabase.supabaseUrl === "YOUR_SUPABASE_URL") {
      setError(
        "Supabase não configurado corretamente. Não é possível adicionar itens."
      );
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from("products")
        .insert([
          { name, description, price: parseFloat(price), image_url: imageUrl },
        ]);

      if (insertError) {
        throw insertError;
      }
      setSuccess("Produto adicionado com sucesso!");
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      onProductAdded();
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
      setError(err.message || "Não foi possível adicionar o produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
    >
      <h3 className="text-2xl font-semibold text-pink-700 mb-6">
        Adicionar Novo Item
      </h3>
      {error && (
        <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">
          {success}
        </p>
      )}
      <div>
        <label
          htmlFor="itemName"
          className="block text-sm font-medium text-gray-700"
        >
          Nome do Item
        </label>
        <input
          type="text"
          id="itemName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="itemDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Descrição
        </label>
        <textarea
          id="itemDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="itemPrice"
          className="block text-sm font-medium text-gray-700"
        >
          Preço (€)
        </label>
        <input
          type="number"
          id="itemPrice"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          step="0.01"
          min="0.01"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="itemImageUrl"
          className="block text-sm font-medium text-gray-700"
        >
          URL da Imagem
        </label>
        <input
          type="url"
          id="itemImageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          placeholder="https://exemplo.com/imagem.jpg"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading || supabase.supabaseUrl === "YOUR_SUPABASE_URL"}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:bg-pink-300"
      >
        {loading ? "A adicionar..." : "Adicionar Item"}
      </button>
      {supabase.supabaseUrl === "YOUR_SUPABASE_URL" && (
        <p className="text-xs text-yellow-600 mt-2">
          Supabase não configurado. A adição de itens está desativada.
        </p>
      )}
    </form>
  );
};

export default AddItemForm;


import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { supabase } from '../supabaseClient';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }
        setProducts(data || []);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError(err.message || "Não foi possível carregar os produtos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    if (supabase.supabaseUrl && supabase.supabaseUrl !== 'YOUR_SUPABASE_URL') {
        fetchProducts();
    } else {
        setLoading(false);
        setError("Supabase não configurado. Adicione URL e Chave Anónima. A mostrar dados mock.");
        setProducts([
            { id: '1', name: 'Casaco Vintage Florido', description: 'Um lindo casaco florido dos anos 70, em perfeito estado.', price: 45.99, image_url: 'https://placehold.co/600x400/f472b6/ffffff?text=Casaco+Vintage' },
            { id: '2', name: 'Calças de Ganga Raras', description: 'Calças de ganga estilo bootcut, edição limitada dos anos 90.', price: 60.00, image_url: 'https://placehold.co/600x400/ec4899/ffffff?text=Calças+Ganga' },
            { id: '3', name: 'Vestido de Seda Único', description: 'Vestido de seda pura, pintado à mão, peça única.', price: 120.50, image_url: 'https://placehold.co/600x400/db2777/ffffff?text=Vestido+Seda' },
        ]);
    }
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-pink-600 text-xl">A carregar produtos... ✨</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600 bg-red-100 border border-red-500 rounded-md p-4">{error}</div>;
  }

  if (products.length === 0 && (supabase.supabaseUrl && supabase.supabaseUrl !== 'YOUR_SUPABASE_URL')) {
    return <div className="text-center py-10 text-gray-600">Ainda não há produtos disponíveis. Volte em breve! 🛍️</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-4xl font-bold text-center text-pink-700 mb-10">Nossos Tesouros Únicos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

import React, { useState, useEffect } from "react";
import AddItemForm from "./AddItemForm";
import AdminProductList from "./AdminProductList";
import { supabase } from "../supabaseClient";

const AdminDashboard = ({ setCurrentView }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        setCurrentView("adminLogin");
        return;
      }
      setAdminUser(session.user);

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (productError) throw productError;
      setProducts(productData || []);
    } catch (err) {
      console.error("Erro no dashboard do admin:", err);
      setError(err.message || "Erro ao carregar dados do admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (supabase.supabaseUrl && supabase.supabaseUrl !== "YOUR_SUPABASE_URL") {
      fetchAdminData();
    } else {
      setLoading(false);
      setError("Supabase não configurado. Funcionalidades de Admin limitadas.");
      setAdminUser({ id: "mock-admin", email: "admin@example.com" }); // Mock user for UI
    }
  }, [setCurrentView]);

  const handleDataChanged = () => {
    if (supabase.supabaseUrl && supabase.supabaseUrl !== "YOUR_SUPABASE_URL") {
      fetchAdminData();
    } else {
      console.log(
        "Simulando atualização de dados do admin (Supabase não configurado)..."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-pink-600">
        A carregar dashboard do admin...
      </div>
    );
  }

  if (
    error &&
    supabase.supabaseUrl &&
    supabase.supabaseUrl !== "YOUR_SUPABASE_URL"
  ) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (
    supabase.supabaseUrl &&
    supabase.supabaseUrl !== "YOUR_SUPABASE_URL" &&
    !adminUser &&
    !loading
  ) {
    setCurrentView("adminLogin");
    return null;
  }

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-pink-800 mb-6">
        Painel de Administração
      </h2>
      {adminUser && (
        <p className="mb-6 text-gray-700">
          Logado como: <span className="font-semibold">{adminUser.email}</span>
        </p>
      )}

      {error && supabase.supabaseUrl === "YOUR_SUPABASE_URL" && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
          {error} {/* Mostra erro de configuração do Supabase */}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AddItemForm onProductAdded={handleDataChanged} />
        </div>
        <div>
          <AdminProductList
            products={products}
            onProductRemoved={handleDataChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

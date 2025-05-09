import React, { useState, useEffect } from "react";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartView from "./components/CartView";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import { supabase } from "./supabaseClient"; // Importa o cliente Supabase

const App = () => {
  const [currentView, setCurrentView] = useState("products");
  const [adminUser, setAdminUser] = useState(null);

  // Efeito para verificar a sessão e ouvir mudanças de autenticação
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAdminUser(session?.user ?? null);
      // Se estiver a tentar aceder à área de admin sem estar logado, redireciona para login
      if (!session?.user && currentView === "admin") {
        setCurrentView("adminLogin");
      }
    };

    // Só interage com Supabase se estiver configurado
    if (supabase.supabaseUrl && supabase.supabaseUrl !== "YOUR_SUPABASE_URL") {
      getSession();
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAdminUser(session?.user ?? null);
        if (_event === "SIGNED_OUT") {
          setCurrentView("products"); // Ao deslogar, volta para a lista de produtos
        }
        // Se o utilizador for deslogado (ex: token expirado) enquanto na view 'admin', redireciona
        if (
          !session?.user &&
          currentView === "admin" &&
          supabase.supabaseUrl &&
          supabase.supabaseUrl !== "YOUR_SUPABASE_URL"
        ) {
          setCurrentView("adminLogin");
        }
      }
    );

    // Limpa o listener ao desmontar o componente
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [currentView]); // Re-executa se currentView mudar, para proteger a rota admin

  // Função para renderizar a vista atual
  const renderView = () => {
    switch (currentView) {
      case "products":
        return <ProductList />;
      case "cart":
        return <CartView setCurrentView={setCurrentView} />;
      case "adminLogin":
        return <AdminLogin setCurrentView={setCurrentView} />;
      case "admin":
        // Permite acesso ao admin se Supabase estiver com URL placeholder (para desenvolvimento de UI sem backend)
        // OU se o Supabase estiver configurado E houver um adminUser
        if (
          supabase.supabaseUrl === "YOUR_SUPABASE_URL" ||
          (supabase.supabaseUrl !== "YOUR_SUPABASE_URL" && adminUser)
        ) {
          return <AdminDashboard setCurrentView={setCurrentView} />;
        }
        // Se o Supabase estiver configurado e não houver utilizador, redireciona para login
        // O useEffect já deve tratar disto, mas como fallback:
        if (supabase.supabaseUrl !== "YOUR_SUPABASE_URL" && !adminUser) {
          setCurrentView("adminLogin");
          return <AdminLogin setCurrentView={setCurrentView} />; // Renderiza o login enquanto redireciona
        }
        return <AdminLogin setCurrentView={setCurrentView} />; // Fallback final
      default:
        return <ProductList />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-pink-50 font-sans">
        <Header setCurrentView={setCurrentView} />
        <main className="pb-16">{renderView()}</main>
        <footer className="bg-pink-700 text-white text-center p-6 mt-auto">
          <p>
            &copy; {new Date().getFullYear()} Vouie boutique. Todos os direitos
            reservados.
          </p>
          <p className="text-sm mt-1">Peças únicas com história.</p>
          {/* Mostra aviso se o Supabase estiver usando as URLs placeholder */}
          {supabase.supabaseUrl === "YOUR_SUPABASE_URL" && (
            <p className="text-xs mt-2 text-yellow-300 bg-pink-800 p-2 rounded">
              AVISO: Supabase não configurado corretamente (usando URLs
              placeholder). A aplicação pode ter funcionalidades limitadas.
            </p>
          )}
        </footer>
      </div>
    </CartProvider>
  );
};

export default App;

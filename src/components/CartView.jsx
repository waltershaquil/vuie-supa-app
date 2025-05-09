
import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartView = ({ setCurrentView }) => {
  const { cart, removeFromCart, clearCart, itemCount } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (itemCount === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-semibold text-pink-700 mb-6">O seu carrinho está vazio!</h2>
        <p className="text-gray-600 mb-8">Parece que ainda não adicionou nenhum tesouro. Que tal explorar nossos produtos?</p>
        <button
          onClick={() => setCurrentView('products')}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          Ver Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <h2 className="text-3xl font-semibold text-pink-700 mb-8 text-center">Seu Carrinho de Compras</h2>
      <div className="bg-white shadow-xl rounded-lg p-6">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between py-4 border-b border-pink-100 last:border-b-0">
            <div className="flex items-center mb-4 sm:mb-0">
              <img
                src={item.image_url || `https://placehold.co/100x100/E91E63/FFFFFF?text=${encodeURIComponent(item.name)}`}
                alt={`[Imagem de ${item.name}]`}
                className="w-20 h-20 object-cover rounded-md mr-4"
                onError={(e) => {
                  const target = e.target;
                  target.onerror = null;
                  target.src = `https://placehold.co/100x100/CCCCCC/000000?text=Erro`;
                }}
              />
              <div>
                <h3 className="text-lg font-medium text-pink-600">{item.name}</h3>
                <p className="text-gray-500 text-sm">Quantidade: {item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-lg text-pink-500 font-semibold mr-6">€{(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition duration-150"
                title="Remover item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <div className="mt-8 pt-6 border-t-2 border-pink-200">
          <div className="flex justify-between items-center text-xl font-semibold text-pink-700">
            <span>Total:</span>
            <span>€{totalPrice.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-right">
            Este site não processa pagamentos. Agradecemos o seu interesse!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={clearCart}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-5 rounded-lg transition duration-200"
            >
              Limpar Carrinho
            </button>
            <button
                onClick={() => alert('Funcionalidade de checkout não implementada.')}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-5 rounded-lg transition duration-200"
            >
                Proceder para Checkout (Simulado)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;

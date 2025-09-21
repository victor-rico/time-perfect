import React, { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';

function ProductModal({ jersey, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !jersey) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const handleAddToCartClick = () => {
    onAddToCart({ ...jersey, size: selectedSize, quantity });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl m-4 relative flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100">
          <X className="w-6 h-6" />
        </button>

        <div className="md:w-1/2">
          <img
            src={jersey.imageUrl}
            alt={jersey.name}
            className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col">
          <h2 className="text-2xl font-bold mb-2">{jersey.teamName}</h2>
          <p className="text-xl text-gray-700 mb-4">{jersey.name}</p>
          <p className="text-3xl font-bold text-green-600 mb-4">{formatPrice(jersey.price)}</p>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Tamanho:</h4>
            <div className="flex space-x-2">
              {['P', 'M', 'G', 'GG', 'XG'].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-md border-2 transition-all ${
                    selectedSize === size
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-green-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Quantidade:</h4>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full border-2 border-gray-300 hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 rounded-full border-2 border-gray-300 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={handleAddToCartClick}
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Adicionar ao Carrinho</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;

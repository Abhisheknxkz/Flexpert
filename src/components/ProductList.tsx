import React from 'react';
import type { Product } from '../types';
import { useAppDispatch } from '../hooks/redux';
import { addToBasket } from '../store/basketSlice';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const dispatch = useAppDispatch();

  const handleAddToBasket = (product: Product) => {
    dispatch(addToBasket(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-3 text-gray-800">Products</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-sm">{product.name}</h3>
              <p className="text-gray-600 text-sm">£{product.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleAddToBasket(product)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

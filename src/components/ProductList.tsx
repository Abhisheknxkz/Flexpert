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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Products</h2>
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">£{product.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleAddToBasket(product)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

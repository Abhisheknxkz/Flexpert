import React from 'react';
import type { BasketItem } from '../types';
import { useAppDispatch } from '../hooks/redux';
import { updateQuantity } from '../store/basketSlice';

interface BasketProps {
  items: BasketItem[];
}

const Basket: React.FC<BasketProps> = ({ items }) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const getItemSavings = (item: BasketItem): number => {
    if (item.product.id === 'cheese' && item.quantity >= 2) {
      const freeItems = Math.floor(item.quantity / 2);
      return freeItems * item.product.price;
    }
    return 0;
  };

  const getItemCostAfterSavings = (item: BasketItem): number => {
    const itemTotal = item.product.price * item.quantity;
    const savings = getItemSavings(item);
    return itemTotal - savings;
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Basket</h2>
        <p className="text-gray-600">Your basket is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Basket</h2>
      <div className="space-y-4">
        {items.map((item) => {
          const itemTotal = item.product.price * item.quantity;
          const savings = getItemSavings(item);
          const finalCost = getItemCostAfterSavings(item);

          return (
            <div key={item.product.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                  <p className="text-gray-600">£{item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p>Item price £{item.product.price.toFixed(2)} * {item.quantity} = £{itemTotal.toFixed(2)}</p>
                {savings > 0 && (
                  <>
                    <p className="text-green-600">Savings £{savings.toFixed(2)}</p>
                    <p className="font-semibold">Item cost £{finalCost.toFixed(2)}</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Basket;

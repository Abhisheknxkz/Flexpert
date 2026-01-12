import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BasketState, BasketItem, Product, BillCalculation } from '../types';
import { SPECIAL_OFFERS } from '../data/specialOffers';

const initialState: BasketState = {
  items: [],
  bill: {
    subtotal: 0,
    savings: 0,
    total: 0,
    appliedOffers: []
  }
};

const calculateBill = (items: BasketItem[]): BillCalculation => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const appliedOffers = SPECIAL_OFFERS.map(offer => {
    const savings = offer.calculateSavings(items);
    const appliedItems = offer.getAppliedItems(items);
    return {
      offerId: offer.id,
      offerName: offer.name,
      savings,
      appliedItems
    };
  }).filter(offer => offer.savings > 0);

  const totalSavings = appliedOffers.reduce((sum, offer) => sum + offer.savings, 0);
  const total = subtotal - totalSavings;

  return {
    subtotal,
    savings: totalSavings,
    total,
    appliedOffers
  };
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1
        });
      }
      state.bill = calculateBill(state.items);
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.product.id !== action.payload);
        }
      }
      state.bill = calculateBill(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.product.id !== productId);
      } else {
        const existingItem = state.items.find(item => item.product.id === productId);
        if (existingItem) {
          existingItem.quantity = quantity;
        }
      }
      state.bill = calculateBill(state.items);
    },
    clearBasket: (state) => {
      state.items = [];
      state.bill = calculateBill([]);
    }
  }
});

export const { addToBasket, removeFromBasket, updateQuantity, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;

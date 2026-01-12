import type { SpecialOffer, BasketItem } from '../types';

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'cheese-bogo',
    name: 'Cheese Buy One Get One Free',
    description: 'When you buy a Cheese, you get a second Cheese free!',
    calculateSavings: (items: BasketItem[]) => {
      const cheeseItem = items.find(item => item.product.id === 'cheese');
      if (!cheeseItem || cheeseItem.quantity < 2) return 0;
      const freeCheeses = Math.floor(cheeseItem.quantity / 2);
      return freeCheeses * cheeseItem.product.price;
    },
    getAppliedItems: (items: BasketItem[]) => {
      const cheeseItem = items.find(item => item.product.id === 'cheese');
      if (!cheeseItem || cheeseItem.quantity < 2) return [];
      const freeCheeses = Math.floor(cheeseItem.quantity / 2);
      return [{
        ...cheeseItem,
        quantity: freeCheeses
      }];
    }
  },
  {
    id: 'soup-bread',
    name: 'Soup and Bread Deal',
    description: 'When you buy a Soup, you get a half price Bread!',
    calculateSavings: (items: BasketItem[]) => {
      const soupItem = items.find(item => item.product.id === 'soup');
      const breadItem = items.find(item => item.product.id === 'bread');
      if (!soupItem || !breadItem) return 0;
      const discountBreads = Math.min(soupItem.quantity, breadItem.quantity);
      return discountBreads * (breadItem.product.price * 0.5);
    },
    getAppliedItems: (items: BasketItem[]) => {
      const soupItem = items.find(item => item.product.id === 'soup');
      const breadItem = items.find(item => item.product.id === 'bread');
      if (!soupItem || !breadItem) return [];
      const discountBreads = Math.min(soupItem.quantity, breadItem.quantity);
      return [{
        ...breadItem,
        quantity: discountBreads
      }];
    }
  },
  {
    id: 'butter-discount',
    name: 'Butter Third Off',
    description: 'Get a third off Butter!',
    calculateSavings: (items: BasketItem[]) => {
      const butterItem = items.find(item => item.product.id === 'butter');
      if (!butterItem) return 0;
      return butterItem.quantity * (butterItem.product.price * (1/3));
    },
    getAppliedItems: (items: BasketItem[]) => {
      const butterItem = items.find(item => item.product.id === 'butter');
      if (!butterItem) return [];
      return [butterItem];
    }
  }
];

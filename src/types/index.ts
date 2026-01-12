export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface SpecialOffer {
  id: string;
  name: string;
  description: string;
  calculateSavings: (items: BasketItem[]) => number;
  getAppliedItems: (items: BasketItem[]) => BasketItem[];
}

export interface BillCalculation {
  subtotal: number;
  savings: number;
  total: number;
  appliedOffers: {
    offerId: string;
    offerName: string;
    savings: number;
    appliedItems: BasketItem[];
  }[];
}

export interface BasketState {
  items: BasketItem[];
  bill: BillCalculation;
}

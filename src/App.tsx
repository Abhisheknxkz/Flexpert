import { Provider } from 'react-redux';
import { store } from './store';
import ProductList from './components/ProductList';
import Basket from './components/Basket';
import BillSummary from './components/BillSummary';
import { useAppSelector } from './hooks/redux';
import { PRODUCTS } from './data/products';
import type { RootState } from './store';
import './App.css';

function AppContent() {
  const { items, bill } = useAppSelector((state: RootState) => state.basket);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Shopping Cart Billing System
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ProductList products={PRODUCTS} />
            <Basket items={items} />
          </div>
          
          <div className="space-y-6">
            <BillSummary bill={bill} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;

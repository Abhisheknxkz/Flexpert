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
    <div className="min-h-screen bg-white py-4">
      <div className="w-full px-4 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Shopping Cart Billing System
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="flex flex-col h-full">
            <ProductList products={PRODUCTS} />
          </div>
          <div className="flex flex-col h-full">
            <Basket items={items} />
          </div>
          <div className="flex flex-col h-full">
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

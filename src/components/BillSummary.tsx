import React from 'react';
import type { BillCalculation } from '../types';

interface BillSummaryProps {
  bill: BillCalculation;
}

const BillSummary: React.FC<BillSummaryProps> = ({ bill }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-3 text-gray-800">Bill Summary</h2>
      
      {bill.appliedOffers.length > 0 && (
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-2 text-gray-700">Special Offers Applied</h3>
          <div className="space-y-2">
            {bill.appliedOffers.map((offer) => (
              <div key={offer.offerId} className="flex justify-between items-center p-2 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium text-green-800 text-sm">{offer.offerName}</p>
                  <p className="text-xs text-green-600">
                    Applied to {offer.appliedItems.length} item(s)
                  </p>
                </div>
                <p className="font-semibold text-green-700 text-sm">-£{offer.savings.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2 border-t pt-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Sub Total:</span>
          <span className="font-semibold text-sm">£{bill.subtotal.toFixed(2)}</span>
        </div>
        
        {bill.savings > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-green-600 text-sm">Savings:</span>
            <span className="font-semibold text-green-600 text-sm">-£{bill.savings.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center text-base font-bold border-t pt-2">
          <span>Total Amount:</span>
          <span className="text-blue-600">£{bill.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BillSummary;

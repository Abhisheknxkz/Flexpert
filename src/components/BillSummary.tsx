import React from 'react';
import type { BillCalculation } from '../types';

interface BillSummaryProps {
  bill: BillCalculation;
}

const BillSummary: React.FC<BillSummaryProps> = ({ bill }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Bill Summary</h2>
      
      {bill.appliedOffers.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Special Offers Applied</h3>
          <div className="space-y-2">
            {bill.appliedOffers.map((offer) => (
              <div key={offer.offerId} className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">{offer.offerName}</p>
                  <p className="text-sm text-green-600">
                    Applied to {offer.appliedItems.length} item(s)
                  </p>
                </div>
                <p className="font-semibold text-green-700">-£{offer.savings.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Sub Total:</span>
          <span className="font-semibold">£{bill.subtotal.toFixed(2)}</span>
        </div>
        
        {bill.savings > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-green-600">Savings:</span>
            <span className="font-semibold text-green-600">-£{bill.savings.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center text-lg font-bold border-t pt-3">
          <span>Total Amount:</span>
          <span className="text-blue-600">£{bill.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-2">
        <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors" title="Download">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors" title="Share">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
          </svg>
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors" title="Print">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BillSummary;

import React, { forwardRef, useMemo } from 'react';
import { Invoice } from '../types';

interface InvoicePreviewProps {
  invoice: Invoice;
}

const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: '$',
    AUD: '$',
    INR: '₹',
};

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ invoice }, ref) => {
  const currencySymbol = currencySymbols[invoice.currency] || '$';

  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toFixed(2)}`;
  }

  const subtotal = useMemo(() => {
    return invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  }, [invoice.items]);

  const taxAmount = useMemo(() => {
    return subtotal * (invoice.taxRate / 100);
  }, [subtotal, invoice.taxRate]);

  const total = useMemo(() => {
    return subtotal + taxAmount;
  }, [subtotal, taxAmount]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString + 'T00:00:00'); // Ensure date is parsed in local timezone
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  return (
    <div ref={ref} className="bg-white dark:bg-gray-900 p-8 md:p-12 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
      <div className="flex justify-between items-start mb-10">
        <div>
          {invoice.logo && (
            <img src={invoice.logo} alt="Company Logo" className="h-16 max-w-xs object-contain mb-4" />
          )}
          <h1 className="text-3xl font-bold" style={{ color: invoice.accentColor }}>INVOICE</h1>
          <p className="text-gray-500 dark:text-gray-400"># {invoice.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{invoice.from.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">{invoice.from.address}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.from.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Bill To</h3>
          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">{invoice.to.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">{invoice.to.address}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.to.email}</p>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Issue Date:</p>
            <p className="text-sm text-gray-800 dark:text-gray-300">{formatDate(invoice.issueDate)}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Due Date:</p>
            <p className="text-sm text-gray-800 dark:text-gray-300">{formatDate(invoice.dueDate)}</p>
          </div>
        </div>
      </div>

      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full">
                    <thead style={{ color: invoice.accentColor }}>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0 border-b-2" style={{ borderColor: invoice.accentColor }}>Item</th>
                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold border-b-2" style={{ borderColor: invoice.accentColor }}>Qty</th>
                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold border-b-2" style={{ borderColor: invoice.accentColor }}>Rate</th>
                            <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold sm:pr-0 border-b-2" style={{ borderColor: invoice.accentColor }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {invoice.items.map((item) => (
                            <tr key={item.id}>
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:w-auto sm:max-w-none sm:pl-0">
                                    {item.description || 'Untitled Item'}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 text-right">{item.quantity}</td>
                                <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 text-right">{formatCurrency(item.rate)}</td>
                                <td className="py-4 pl-3 pr-4 text-sm font-medium text-gray-900 dark:text-white text-right sm:pr-0">{formatCurrency(item.quantity * item.rate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Tax ({invoice.taxRate}%)</span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatCurrency(taxAmount)}</span>
          </div>
          <div className="flex justify-between pt-2 mt-2" style={{ borderTop: `2px solid ${invoice.accentColor}` }}>
            <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
            <span className="text-base font-bold" style={{ color: invoice.accentColor }}>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Notes</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}

    </div>
  );
});

export default InvoicePreview;
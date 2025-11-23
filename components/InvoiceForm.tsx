import React from 'react';
import { Invoice, LineItem } from '../types';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface InvoiceFormProps {
  invoice: Invoice;
  onUpdateInvoice: <K extends keyof Invoice>(key: K, value: Invoice[K]) => void;
  onUpdateParty: (party: 'from' | 'to', key: string, value: string) => void;
  onItemChange: (index: number, field: keyof Omit<LineItem, 'id'>, value: string | number) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const currencies = [
    { code: 'USD', name: 'United States Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound Sterling', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: '$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: '$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];

const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-dusty-pink focus:ring-dusty-pink sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
);

const FormTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-dusty-pink focus:ring-dusty-pink sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
);

const FormSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-dusty-pink focus:ring-dusty-pink sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
);

const FormLabel = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label {...props} className="block text-sm font-medium text-gray-700 dark:text-gray-300" />
);

const FormSection: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
  <div className="p-4 bg-white dark:bg-black/20 dark:backdrop-blur-sm dark:border dark:border-white/10 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{title}</h3>
    {children}
  </div>
);


const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  onUpdateInvoice,
  onUpdateParty,
  onItemChange,
  onAddItem,
  onRemoveItem,
  onLogoUpload
}) => {
  return (
    <>
      <FormSection title="Branding">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 items-start">
          <div>
            <FormLabel htmlFor="logo">Company Logo</FormLabel>
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={onLogoUpload}
              className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-light-pink/20 file:text-gray-500 dark:file:text-gray-100 hover:file:bg-light-pink/40 cursor-pointer"
            />
             {invoice.logo && (
                <div className="mt-2 relative w-24">
                  <img src={invoice.logo} alt="Company Logo" className="h-16 w-auto object-contain rounded border p-1 border-gray-200 dark:border-gray-600" />
                  <button 
                    onClick={() => onUpdateInvoice('logo', null)} 
                    className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold"
                    aria-label="Remove logo"
                  >
                    &times;
                  </button>
                </div>
              )}
          </div>
          <div>
            <FormLabel htmlFor="accentColor">Accent Color</FormLabel>
            <div className="flex items-center mt-1">
              <input
                type="color"
                id="accentColor"
                value={invoice.accentColor}
                onChange={(e) => onUpdateInvoice('accentColor', e.target.value)}
                className="h-10 w-10 p-1 border-gray-300 dark:border-gray-600 rounded-md cursor-pointer bg-white dark:bg-gray-700"
              />
              <input
                type="text"
                value={invoice.accentColor}
                onChange={(e) => onUpdateInvoice('accentColor', e.target.value)}
                className="ml-2 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-dusty-pink focus:ring-dusty-pink sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection title="Invoice Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FormLabel htmlFor="invoiceNumber">Invoice Number</FormLabel>
            <FormInput type="text" id="invoiceNumber" value={invoice.invoiceNumber} onChange={(e) => onUpdateInvoice('invoiceNumber', e.target.value)} />
          </div>
          <div>
            <FormLabel htmlFor="currency">Currency</FormLabel>
            <FormSelect id="currency" value={invoice.currency} onChange={(e) => onUpdateInvoice('currency', e.target.value)}>
                {currencies.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
            </FormSelect>
          </div>
          <div>
            <FormLabel htmlFor="issueDate">Issue Date</FormLabel>
            <FormInput type="date" id="issueDate" value={invoice.issueDate} onChange={(e) => onUpdateInvoice('issueDate', e.target.value)} />
          </div>
          <div>
            <FormLabel htmlFor="dueDate">Due Date</FormLabel>
            <FormInput type="date" id="dueDate" value={invoice.dueDate} onChange={(e) => onUpdateInvoice('dueDate', e.target.value)} />
          </div>
        </div>
      </FormSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormSection title="From">
          <div className="space-y-3">
            <div>
              <FormLabel>Name</FormLabel>
              <FormInput type="text" value={invoice.from.name} onChange={(e) => onUpdateParty('from', 'name', e.target.value)} />
            </div>
            <div>
              <FormLabel>Email</FormLabel>
              <FormInput type="email" value={invoice.from.email} onChange={(e) => onUpdateParty('from', 'email', e.target.value)} />
            </div>
            <div>
              <FormLabel>Address</FormLabel>
              <FormTextarea value={invoice.from.address} onChange={(e) => onUpdateParty('from', 'address', e.target.value)} rows={3} />
            </div>
          </div>
        </FormSection>
        <FormSection title="To">
          <div className="space-y-3">
            <div>
              <FormLabel>Name</FormLabel>
              <FormInput type="text" value={invoice.to.name} onChange={(e) => onUpdateParty('to', 'name', e.target.value)} />
            </div>
            <div>
              <FormLabel>Email</FormLabel>
              <FormInput type="email" value={invoice.to.email} onChange={(e) => onUpdateParty('to', 'email', e.target.value)} />
            </div>
            <div>
              <FormLabel>Address</FormLabel>
              <FormTextarea value={invoice.to.address} onChange={(e) => onUpdateParty('to', 'address', e.target.value)} rows={3} />
            </div>
          </div>
        </FormSection>
      </div>
      
      <FormSection title="Items">
        <div className="space-y-4">
          {invoice.items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-12 sm:col-span-5">
                {index === 0 && <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Description</label>}
                <FormInput type="text" placeholder="Item description" value={item.description} onChange={(e) => onItemChange(index, 'description', e.target.value)} />
              </div>
              <div className="col-span-4 sm:col-span-2">
                {index === 0 && <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Qty</label>}
                <FormInput type="number" placeholder="1" value={item.quantity} onChange={(e) => onItemChange(index, 'quantity', parseFloat(e.target.value) || 0)} className="text-right" />
              </div>
              <div className="col-span-4 sm:col-span-2">
                {index === 0 && <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Rate</label>}
                <FormInput type="number" placeholder="0" value={item.rate} onChange={(e) => onItemChange(index, 'rate', parseFloat(e.target.value) || 0)} className="text-right" />
              </div>
              <div className="col-span-3 sm:col-span-2 text-right">
                 {index === 0 && <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Total</label>}
                 <p className="mt-1 py-2 text-sm text-gray-600 dark:text-gray-300">{(item.quantity * item.rate).toFixed(2)}</p>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                 <button onClick={() => onRemoveItem(index)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50">
                   <TrashIcon />
                 </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onAddItem} className="mt-4 flex items-center text-muted-magenta hover:text-dusty-pink dark:text-dusty-pink dark:hover:text-light-pink text-sm font-medium">
          <PlusIcon />
          <span className="ml-1">Add Item</span>
        </button>
      </FormSection>

      <FormSection title="Notes & Tax">
        <div>
          <FormLabel htmlFor="notes">Notes</FormLabel>
          <FormTextarea id="notes" value={invoice.notes} onChange={(e) => onUpdateInvoice('notes', e.target.value)} rows={3} />
        </div>
        <div className="mt-4">
          <FormLabel htmlFor="taxRate">Tax Rate (%)</FormLabel>
          <FormInput type="number" id="taxRate" value={invoice.taxRate} onChange={(e) => onUpdateInvoice('taxRate', parseFloat(e.target.value) || 0)} className="w-40" />
        </div>
      </FormSection>
    </>
  );
};

export default InvoiceForm;
import React, { useState, useCallback, useRef } from 'react';
import { Invoice, LineItem } from '../types';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import ThemeToggle from './ThemeToggle';

declare const jspdf: any;
declare const html2canvas: any;

const InvoicePage: React.FC<{ onLogout: () => void }> = ({ onLogout}) => {
  const getInitialInvoice = (): Invoice => {
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 30);
    return {
      invoiceNumber: `INV-${new Date().getTime().toString().slice(-6)}`,
      from: {
        name: 'Your Company',
        address: '123 Main St\nAnytown, USA 12345',
        email: 'contact@yourcompany.com',
      },
      to: {
        name: 'Client Company',
        address: '456 Oak Ave\nOthertown, USA 54321',
        email: 'contact@client.com',
      },
      items: [
        { id: '1', description: 'Web Design Services', quantity: 10, rate: 50 },
        { id: '2', description: 'Backend Development', quantity: 20, rate: 75 },
      ],
      notes: 'Thank you for your business. Please pay within 30 days.',
      taxRate: 5,
      issueDate: today.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      currency: 'USD',
      logo: null,
      accentColor: '#92487A', // muted-magenta
    };
  };

  const [invoice, setInvoice] = useState<Invoice>(getInitialInvoice());
  const [isGenerating, setIsGenerating] = useState(false);
  const invoicePreviewRef = useRef<HTMLDivElement>(null);

  const updateInvoice = useCallback(<K extends keyof Invoice>(key: K, value: Invoice[K]) => {
    setInvoice(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
          alert('Logo size should not exceed 2MB.');
          return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        updateInvoice('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const updateParty = useCallback((party: 'from' | 'to', key: string, value: string) => {
    setInvoice(prev => ({
      ...prev,
      [party]: {
        ...prev[party],
        [key]: value,
      }
    }));
  }, []);

  const handleItemChange = useCallback((index: number, field: keyof Omit<LineItem, 'id'>, value: string | number) => {
    const newItems = [...invoice.items];
    const item = { ...newItems[index] };
    (item[field] as any) = value;
    newItems[index] = item;
    updateInvoice('items', newItems);
  }, [invoice.items, updateInvoice]);

  const addItem = useCallback(() => {
    const newItems = [...invoice.items, { id: new Date().getTime().toString(), description: '', quantity: 1, rate: 0 }];
    updateInvoice('items', newItems);
  }, [invoice.items, updateInvoice]);

  const removeItem = useCallback((index: number) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    updateInvoice('items', newItems);
  }, [invoice.items, updateInvoice]);

  const handleDownloadPdf = async () => {
    if (!invoicePreviewRef.current) return;
    setIsGenerating(true);
    
    // Temporarily switch to light mode for PDF generation for consistent output
    const htmlEl = document.documentElement;
    const isDarkMode = htmlEl.classList.contains('dark');
    if (isDarkMode) {
      htmlEl.classList.remove('dark');
    }

    try {
      const { jsPDF } = jspdf;
      // Use the invoicePreviewRef for canvas, ensuring it's not null
      const canvas = await html2canvas(invoicePreviewRef.current, { 
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff' // Force white background
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    } finally {
      // Re-apply dark mode if it was active before
      if (isDarkMode) {
        htmlEl.classList.add('dark');
      }
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setInvoice(getInitialInvoice());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-deep-purple text-gray-800 dark:text-gray-200">
      <header className="bg-white/80 dark:bg-black/20 backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoice Generator</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={onLogout}
              className="text-sm font-medium text-muted-magenta hover:text-dusty-pink focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <InvoiceForm
                invoice={invoice}
                onUpdateInvoice={updateInvoice}
                onUpdateParty={updateParty}
                onItemChange={handleItemChange}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                onLogoUpload={handleLogoUpload}
              />
              <div className="p-4 bg-white dark:bg-black/20 dark:backdrop-blur-sm dark:border dark:border-white/10 rounded-lg shadow sticky top-24">
                  <h3 className="text-lg font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Actions</h3>
                  <div className="flex flex-col space-y-3">
                      <button
                          onClick={handleDownloadPdf}
                          disabled={isGenerating}
                          className="w-full bg-muted-magenta text-white py-2 px-4 rounded-md hover:bg-dusty-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-muted-magenta disabled:bg-opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      >
                        {isGenerating ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                          </>
                        ) : 'Download PDF'}
                      </button>
                      <button
                          onClick={resetForm}
                          className="w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-muted-magenta transition-colors"
                      >
                          Reset Form
                      </button>
                  </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <InvoicePreview invoice={invoice} ref={invoicePreviewRef} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvoicePage;
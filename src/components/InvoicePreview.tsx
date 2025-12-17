"use client";

import React, { forwardRef, useMemo } from 'react';
import { Invoice, currencySymbols } from '@/types/invoice';

interface InvoicePreviewProps {
    invoice: Invoice;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ invoice }, ref) => {
    const currencySymbol = currencySymbols[invoice.currency] || '$';

    const formatCurrency = (amount: number) => {
        return `${currencySymbol}${amount.toFixed(2)}`;
    };

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
        const date = new Date(dateString + 'T00:00:00');
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <div ref={ref} className="bg-white p-4 sm:p-6 md:p-10 rounded-3xl shadow-2xl border-2 border-white/60">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: invoice.accentColor }}>INVOICE</h1>
                    <p className="text-[#6B6B6B] mt-1"># {invoice.invoiceNumber}</p>
                    {invoice.logo && (
                        <img src={invoice.logo} alt="Company Logo" className="h-18 max-w-xs object-contain mb-2" />
                    )}
                </div>
                <div className="text-left md:text-right w-full md:w-auto">
                    <h3 className="text-xs font-bold text-[#9E9E9E] uppercase mb-2">From</h3>
                    <h2 className="text-xl font-bold text-[#2D2D2D]">{invoice.from.name}</h2>
                    <p className="text-xs text-[#6B6B6B] whitespace-pre-line mt-1">{invoice.from.address}</p>
                    <p className="text-xs text-[#6B6B6B]">{invoice.from.email}</p>
                </div>
            </div>

            {/* Bill To & Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-9">
                <div>
                    <h3 className="text-xs font-bold text-[#9E9E9E] uppercase mb-2">Bill To</h3>
                    <h4 className="text-lg font-bold text-[#2D2D2D]">{invoice.to.name}</h4>
                    <p className="text-xs text-[#6B6B6B] whitespace-pre-line">{invoice.to.address}</p>
                    <p className="text-xs text-[#6B6B6B]">{invoice.to.email}</p>
                </div>
                <div className="text-left sm:text-right">
                    <div className="mb-3">
                        <p className="text-xs font-bold text-[#9E9E9E] uppercase">Issue Date</p>
                        <p className="text-sm text-[#2D2D2D] font-semibold">{formatDate(invoice.issueDate)}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-[#9E9E9E] uppercase">Due Date</p>
                        <p className="text-sm text-[#2D2D2D] font-semibold">{formatDate(invoice.dueDate)}</p>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto mb-8">
                <table className="min-w-full">
                    <thead style={{ color: invoice.accentColor }}>
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-bold border-b-2" style={{ borderColor: invoice.accentColor }}>
                                Item
                            </th>
                            <th className="py-3 px-4 text-right text-sm font-bold border-b-2" style={{ borderColor: invoice.accentColor }}>
                                Qty
                            </th>
                            <th className="py-3 px-4 text-right text-sm font-bold border-b-2" style={{ borderColor: invoice.accentColor }}>
                                Rate
                            </th>
                            <th className="py-3 px-4 text-right text-sm font-bold border-b-2" style={{ borderColor: invoice.accentColor }}>
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {invoice.items.map((item) => (
                            <tr key={item.id}>
                                <td className="py-4 px-4 text-sm font-medium text-[#2D2D2D]">
                                    {item.description || 'Untitled Item'}
                                </td>
                                <td className="py-4 px-4 text-sm text-[#6B6B6B] text-right">{item.quantity}</td>
                                <td className="py-4 px-4 text-sm text-[#6B6B6B] text-right">{formatCurrency(item.rate)}</td>
                                <td className="py-4 px-4 text-sm font-semibold text-[#2D2D2D] text-right">
                                    {formatCurrency(item.quantity * item.rate)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-10">
                <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm text-[#6B6B6B]">Subtotal</span>
                        <span className="text-sm font-semibold text-[#2D2D2D]">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-[#6B6B6B]">Tax ({invoice.taxRate}%)</span>
                        <span className="text-sm font-semibold text-[#2D2D2D]">{formatCurrency(taxAmount)}</span>
                    </div>
                    <div className="flex justify-between pt-3 mt-2 border-t-2" style={{ borderColor: invoice.accentColor }}>
                        <span className="text-lg font-bold text-[#2D2D2D]">Total</span>
                        <span className="text-lg font-bold" style={{ color: invoice.accentColor }}>
                            {formatCurrency(total)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
                <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-xs font-bold text-[#9E9E9E] uppercase mb-2">Notes</h3>
                    <p className="text-sm text-[#6B6B6B] whitespace-pre-line">{invoice.notes}</p>
                </div>
            )}
        </div>
    );
});

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;

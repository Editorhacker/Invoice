"use client";

import React from "react";
import { Invoice, LineItem, currencies } from "@/types/invoice";

interface InvoiceFormProps {
    invoice: Invoice;
    onUpdateInvoice: <K extends keyof Invoice>(key: K, value: Invoice[K]) => void;
    onUpdateParty: (party: 'from' | 'to', key: string, value: string) => void;
    onItemChange: (index: number, field: keyof Omit<LineItem, 'id'>, value: string | number) => void;
    onAddItem: () => void;
    onRemoveItem: (index: number) => void;
    onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InvoiceGenerator: React.FC<InvoiceFormProps> = ({
    invoice,
    onUpdateInvoice,
    onUpdateParty,
    onItemChange,
    onAddItem,
    onRemoveItem,
    onLogoUpload
}) => {
    return (
        <div className="space-y-6">
            {/* Branding Section */}
            <div className="clay-form-section">
                <h3 className="text-lg font-bold gradient-text-clay mb-4">Branding</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="clay-label text-xs">Company Logo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onLogoUpload}
                            className="block w-full text-sm text-[#6B6B6B]
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[#E8DFF5] file:text-[#92487A]
                hover:file:bg-[#D4C5E3]
                cursor-pointer"
                        />
                        {invoice.logo && (
                            <div className="mt-3 relative inline-block">
                                <img src={invoice.logo} alt="Logo" className="h-16 w-auto object-contain rounded-xl border-2 border-white/60 p-2 bg-white/40" />
                                <button
                                    type="button"
                                    onClick={() => onUpdateInvoice('logo', null)}
                                    className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold hover:bg-rose-600 transition"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="clay-label text-xs">Accent Color</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={invoice.accentColor}
                                onChange={(e) => onUpdateInvoice('accentColor', e.target.value)}
                                className="h-12 w-12 rounded-xl cursor-pointer border-2 border-white/60"
                            />
                            <input
                                type="text"
                                value={invoice.accentColor}
                                onChange={(e) => onUpdateInvoice('accentColor', e.target.value)}
                                className="clay-input flex-1"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice Details */}
            <div className="clay-form-section">
                <h3 className="text-lg font-bold gradient-text-clay mb-3">Invoice Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="clay-label text-xs">Invoice Number</label>
                        <input
                            type="text"
                            value={invoice.invoiceNumber}
                            onChange={(e) => onUpdateInvoice('invoiceNumber', e.target.value)}
                            className="clay-input text-xs"
                        />
                    </div>
                    <div>
                        <label className="clay-label text-xs">Currency</label>
                        <select
                            value={invoice.currency}
                            onChange={(e) => onUpdateInvoice('currency', e.target.value)}
                            className="clay-select text-xs"
                        >
                            {currencies.map(c => (
                                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="clay-label text-xs">Issue Date</label>
                        <input
                            type="date"
                            value={invoice.issueDate}
                            onChange={(e) => onUpdateInvoice('issueDate', e.target.value)}
                            className="clay-input text-xs"
                        />
                    </div>
                    <div>
                        <label className="clay-label text-xs">Due Date</label>
                        <input
                            type="date"
                            value={invoice.dueDate}
                            onChange={(e) => onUpdateInvoice('dueDate', e.target.value)}
                            className="clay-input text-xs"
                        />
                    </div>
                </div>
            </div>

            {/* From/To Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="clay-form-section">
                    <h3 className="text-lg font-bold gradient-text-clay mb-3">From</h3>
                    <div className="space-y-2">
                        <div>
                            <label className="clay-label text-xs">Name</label>
                            <input
                                type="text"
                                value={invoice.from.name}
                                onChange={(e) => onUpdateParty('from', 'name', e.target.value)}
                                className="clay-input"
                            />
                        </div>
                        <div>
                            <label className="clay-label text-xs">Email</label>
                            <input
                                type="email"
                                value={invoice.from.email}
                                onChange={(e) => onUpdateParty('from', 'email', e.target.value)}
                                className="clay-input"
                            />
                        </div>
                        <div>
                            <label className="clay-label text-xs">Address</label>
                            <textarea
                                value={invoice.from.address}
                                onChange={(e) => onUpdateParty('from', 'address', e.target.value)}
                                rows={3}
                                className="clay-textarea"
                            />
                        </div>
                    </div>
                </div>

                <div className="clay-form-section">
                    <h3 className="text-lg font-bold gradient-text-clay mb-3">To</h3>
                    <div className="space-y-2">
                        <div>
                            <label className="clay-label text-xs">Name</label>
                            <input
                                type="text"
                                value={invoice.to.name}
                                onChange={(e) => onUpdateParty('to', 'name', e.target.value)}
                                className="clay-input"
                            />
                        </div>
                        <div>
                            <label className="clay-label text-xs">Email</label>
                            <input
                                type="email"
                                value={invoice.to.email}
                                onChange={(e) => onUpdateParty('to', 'email', e.target.value)}
                                className="clay-input"
                            />
                        </div>
                        <div>
                            <label className="clay-label text-xs">Address</label>
                            <textarea
                                value={invoice.to.address}
                                onChange={(e) => onUpdateParty('to', 'address', e.target.value)}
                                rows={3}
                                className="clay-textarea"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Line Items */}
            <div className="clay-form-section">
                <h3 className="text-lg font-bold gradient-text-clay mb-4">Items</h3>
                <div className="space-y-3">
                    {invoice.items.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                            <div className="col-span-12 sm:col-span-5">
                                {index === 0 && <label className="clay-label text-xs text-xs">Description</label>}
                                <input
                                    type="text"
                                    placeholder="Item description"
                                    value={item.description}
                                    onChange={(e) => onItemChange(index, 'description', e.target.value)}
                                    className="clay-input"
                                />
                            </div>
                            <div className="col-span-4 sm:col-span-2">
                                {index === 0 && <label className="clay-label text-xs text-xs">Qty</label>}
                                <input
                                    type="number"
                                    placeholder="1"
                                    value={item.quantity}
                                    onChange={(e) => onItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                                    className="clay-input text-right"
                                />
                            </div>
                            <div className="col-span-4 sm:col-span-2">
                                {index === 0 && <label className="clay-label text-xs text-xs">Rate</label>}
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={item.rate}
                                    onChange={(e) => onItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                                    className="clay-input text-right"
                                />
                            </div>
                            <div className="col-span-3 sm:col-span-2 text-right">
                                {index === 0 && <label className="clay-label text-xs text-xs">Total</label>}
                                <p className="py-3 text-sm font-semibold text-[#92487A]">
                                    {(item.quantity * item.rate).toFixed(2)}
                                </p>
                            </div>
                            <div className="col-span-1 flex items-center justify-end">
                                <button
                                    type="button"
                                    onClick={() => onRemoveItem(index)}
                                    className="text-rose-500 hover:text-rose-700 p-2 rounded-full hover:bg-rose-50 transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={onAddItem}
                    className="mt-4 flex items-center text-[#92487A] hover:text-[#A05589] text-sm font-semibold transition"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Item
                </button>
            </div>

            {/* Notes & Tax */}
            <div className="clay-form-section">
                <h3 className="text-lg font-bold gradient-text-clay mb-4">Notes & Tax</h3>
                <div className="space-y-4">
                    <div>
                        <label className="clay-label text-xs">Notes</label>
                        <textarea
                            value={invoice.notes}
                            onChange={(e) => onUpdateInvoice('notes', e.target.value)}
                            rows={3}
                            className="clay-textarea"
                            placeholder="Thank you for your business..."
                        />
                    </div>
                    <div>
                        <label className="clay-label text-xs">Tax Rate (%)</label>
                        <input
                            type="number"
                            value={invoice.taxRate}
                            onChange={(e) => onUpdateInvoice('taxRate', parseFloat(e.target.value) || 0)}
                            className="clay-input w-40"
                            step="0.1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceGenerator;

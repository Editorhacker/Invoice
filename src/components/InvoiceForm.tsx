"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface InvoiceFormProps {
    initialData?: any;
    isEditing?: boolean;
}

interface LineItem {
    name: string;
    quantity: number;
    price: number;
}

export default function InvoiceForm({ initialData, isEditing }: InvoiceFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState(
        initialData || {
            clientName: "",
            clientEmail: "",
            amount: 0,
            status: "Pending",
            date: new Date().toISOString().split("T")[0],
            dueDate: new Date().toISOString().split("T")[0],
            items: [] as LineItem[],
        }
    );

    useEffect(() => {
        const total = formData.items.reduce((sum: number, item: LineItem) => {
            return sum + (item.quantity * item.price);
        }, 0);
        setFormData((prev: any) => ({ ...prev, amount: total }));
    }, [formData.items]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { name: "", quantity: 1, price: 0 }],
        });
    };

    const removeItem = (index: number) => {
        const newItems = formData.items.filter((_: any, i: number) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const updateItem = (index: number, field: keyof LineItem, value: string | number) => {
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = isEditing ? `/api/invoices/${initialData._id}` : "/api/invoices";
        const method = isEditing ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            alert("Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
            <div className="card p-8">
                <h2 className="text-2xl font-bold gradient-text mb-8">
                    {isEditing ? "Edit Invoice" : "Create Invoice"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Client Name</label>
                        <input
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Client Email</label>
                        <input
                            type="email"
                            name="clientEmail"
                            value={formData.clientEmail}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Total Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            readOnly
                            className="input-field bg-slate-50 cursor-not-allowed font-semibold text-indigo-600"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Invoice Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                            onChange={handleChange}
                            className="text-xs"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
                            onChange={handleChange}
                            className="text-xs"
                            required
                        />
                    </div>
                </div>

                {/* Line Items Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-slate-900">Line Items</h3>
                        <button
                            type="button"
                            onClick={addItem}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-emerald-500/30"
                        >
                            + Add Item
                        </button>
                    </div>

                    {formData.items.length > 0 && (
                        <div className="border-2 border-slate-200 rounded-xl overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Description</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 w-24">Qty</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 w-32">Price</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 w-32">Total</th>
                                        <th className="px-4 py-3 w-20"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {formData.items.map((item: LineItem, index: number) => (
                                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={(e) => updateItem(index, "name", e.target.value)}
                                                    className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
                                                    placeholder="Item description"
                                                    required
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 0)}
                                                    className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
                                                    min="1"
                                                    required
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <input
                                                    type="number"
                                                    value={item.price}
                                                    onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                                                    className="w-full border-2 border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all"
                                                    step="0.01"
                                                    min="0"
                                                    required
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-sm font-bold text-indigo-600">
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(index)}
                                                    className="text-rose-600 hover:text-rose-800 text-sm font-medium transition"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {formData.items.length === 0 && (
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-slate-500 mb-2">No items added yet</p>
                            <p className="text-sm text-slate-400">Click "Add Item" to get started</p>
                        </div>
                    )}
                </div>

                <button type="submit" className="btn-primary w-full text-lg py-3">
                    {isEditing ? "Update Invoice" : "Create Invoice"}
                </button>
            </div>
        </form>
    );
}

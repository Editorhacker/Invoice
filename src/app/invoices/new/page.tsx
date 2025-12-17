"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import InvoicePreview from "@/components/InvoicePreview";
import { Invoice, LineItem } from "@/types/invoice";

export default function NewInvoicePage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [isGenerating, setIsGenerating] = useState(false);
    const invoicePreviewRef = useRef<HTMLDivElement>(null);

    const getInitialInvoice = (): Invoice => {
        const today = new Date();
        const dueDate = new Date();
        dueDate.setDate(today.getDate() + 30);

        return {
            invoiceNumber: "",
            from: {
                name: session?.user?.name || '',
                address: '',
                email: session?.user?.email || '',
            },
            to: {
                name: '',
                address: '',
                email: '',
            },
            items: [
                { id: '1', description: '', quantity: 1, rate: 0 },
            ],
            notes: '',
            taxRate: 0,
            issueDate: today.toISOString().split('T')[0],
            dueDate: dueDate.toISOString().split('T')[0],
            currency: 'USD',
            logo: null,
            accentColor: '#92487A',
            amount: 0,
            status: 'Pending',
        };
    };

    const [invoice, setInvoice] = useState<Invoice>(getInitialInvoice());

    const updateInvoice = useCallback(<K extends keyof Invoice>(key: K, value: Invoice[K]) => {
        setInvoice(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
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
        const newItems = [...invoice.items, { id: Date.now().toString(), description: '', quantity: 1, rate: 0 }];
        updateInvoice('items', newItems);
    }, [invoice.items, updateInvoice]);

    const removeItem = useCallback((index: number) => {
        const newItems = invoice.items.filter((_, i) => i !== index);
        updateInvoice('items', newItems);
    }, [invoice.items, updateInvoice]);

    const calculateTotal = () => {
        const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
        const taxAmount = subtotal * (invoice.taxRate / 100);
        return subtotal + taxAmount;
    };

    const handleSave = async () => {
        const total = calculateTotal();
        const invoiceData = { ...invoice, amount: total };

        const res = await fetch("/api/invoices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(invoiceData),
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            alert("Failed to create invoice");
        }
    };

    const handleDownloadPdf = async () => {
        setIsGenerating(true);

        try {
            const { generateInvoicePDF } = await import('@/lib/pdfGenerator');
            await generateInvoicePDF(invoice);
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            alert("There was an error generating the PDF. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Invoice</h1>
                <p className="text-gray-500">Fill in the details below to generate your invoice</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* Left Column - Form */}
                <div className="xl:col-span-5 space-y-6">
                    <InvoiceGenerator
                        invoice={invoice}
                        onUpdateInvoice={updateInvoice}
                        onUpdateParty={updateParty}
                        onItemChange={handleItemChange}
                        onAddItem={addItem}
                        onRemoveItem={removeItem}
                        onLogoUpload={handleLogoUpload}
                    />

                    {/* Actions */}
                    <div className="clay-card p-6 sticky top-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={handleSave}
                                className="clay-btn w-full"
                            >
                                Save Invoice
                            </button>
                            <button
                                onClick={handleDownloadPdf}
                                disabled={isGenerating}
                                className="clay-btn-secondary w-full flex items-center justify-center"
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating...
                                    </>
                                ) : 'Download PDF'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Preview */}
                <div className="xl:col-span-7">
                    <div className="sticky top-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Preview</h3>
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Live Preview</span>
                        </div>
                        <div className="shadow-xl rounded-3xl overflow-hidden border border-gray-100">
                            <InvoicePreview invoice={invoice} ref={invoicePreviewRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



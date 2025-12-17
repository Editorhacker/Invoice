"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import InvoicePreview from "@/components/InvoicePreview";
import { Invoice, LineItem } from "@/types/invoice";

export default function EditInvoicePage() {
    const router = useRouter();
    const params = useParams();
    const [isGenerating, setIsGenerating] = useState(false);
    const [loading, setLoading] = useState(true);
    const invoicePreviewRef = useRef<HTMLDivElement>(null);

    const [invoice, setInvoice] = useState<Invoice | null>(null);

    useEffect(() => {
        if (params.id) {
            fetchInvoice(params.id as string);
        }
    }, [params.id]);

    const fetchInvoice = async (id: string) => {
        try {
            const res = await fetch(`/api/invoices/${id}`);
            if (res.ok) {
                const data = await res.json();
                // Convert dates to YYYY-MM-DD format
                data.issueDate = new Date(data.issueDate).toISOString().split('T')[0];
                data.dueDate = new Date(data.dueDate).toISOString().split('T')[0];
                setInvoice(data);
            }
        } catch (error) {
            console.error("Failed to fetch invoice", error);
        } finally {
            setLoading(false);
        }
    };

    const updateInvoice = useCallback(<K extends keyof Invoice>(key: K, value: Invoice[K]) => {
        setInvoice(prev => prev ? { ...prev, [key]: value } : null);
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
        setInvoice(prev => prev ? ({
            ...prev,
            [party]: {
                ...prev[party],
                [key]: value,
            }
        }) : null);
    }, []);

    const handleItemChange = useCallback((index: number, field: keyof Omit<LineItem, 'id'>, value: string | number) => {
        if (!invoice) return;
        const newItems = [...invoice.items];
        const item = { ...newItems[index] };
        (item[field] as any) = value;
        newItems[index] = item;
        updateInvoice('items', newItems);
    }, [invoice, updateInvoice]);

    const addItem = useCallback(() => {
        if (!invoice) return;
        const newItems = [...invoice.items, { id: Date.now().toString(), description: '', quantity: 1, rate: 0 }];
        updateInvoice('items', newItems);
    }, [invoice, updateInvoice]);

    const removeItem = useCallback((index: number) => {
        if (!invoice) return;
        const newItems = invoice.items.filter((_, i) => i !== index);
        updateInvoice('items', newItems);
    }, [invoice, updateInvoice]);

    const calculateTotal = () => {
        if (!invoice) return 0;
        const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
        const taxAmount = subtotal * (invoice.taxRate / 100);
        return subtotal + taxAmount;
    };

    const handleSave = async () => {
        if (!invoice) return;
        const total = calculateTotal();
        const invoiceData = { ...invoice, amount: total };

        const res = await fetch(`/api/invoices/${params.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(invoiceData),
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            alert("Failed to update invoice");
        }
    };

    const handleDownloadPdf = async () => {
        if (!invoice) return;
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#92487A]"></div>
            </div>
        );
    }

    if (!invoice) {
        return <div className="text-center mt-10">Invoice not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Invoice</h1>
                <p className="text-gray-500">Update your invoice details below</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
                {/* Left Column - Form (Scrollable) */}
                <div className="xl:col-span-5 max-h-[calc(100vh-6rem)] rounded-3xl overflow-y-auto pr-2 space-y-6 scrollbar-hide">
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
                    <div className="clay-card p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={handleSave}
                                className="clay-btn w-full"
                            >
                                Update Invoice
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

                {/* Right Column - Preview (Sticky) */}
                <div className="xl:col-span-7 sticky top-2 h-[calc(100vh-4rem)]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Preview</h3>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Live Preview</span>
                    </div>
                    <div className="shadow-xl rounded-3xl overflow-hidden scrollbar-hide border border-gray-100 h-full overflow-y-auto">
                        <InvoicePreview invoice={invoice} ref={invoicePreviewRef} />
                    </div>
                </div>
            </div>
        </div>
    );
}

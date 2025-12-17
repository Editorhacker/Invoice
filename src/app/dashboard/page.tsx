"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { currencySymbols } from "@/types/invoice";

interface Invoice {
    _id: string;
    invoiceNumber: string;
    to?: {
        name: string;
    };
    clientName?: string; // Legacy field
    amount: number;
    status: string;
    issueDate: string;
    dueDate: string;
    currency: string;
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            fetchInvoices();
        }
    }, [status, router]);

    const fetchInvoices = async () => {
        try {
            const res = await fetch("/api/invoices");
            if (res.ok) {
                const data = await res.json();
                setInvoices(data);
            }
        } catch (error) {
            console.error("Failed to fetch invoices", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteInvoice = async (id: string) => {
        if (!confirm("Are you sure you want to delete this invoice?")) return;

        try {
            const res = await fetch(`/api/invoices/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setInvoices(invoices.filter((invoice) => invoice._id !== id));
            } else {
                alert("Failed to delete invoice");
            }
        } catch (error) {
            console.error("Failed to delete invoice", error);
        }
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case "Paid":
                return "clay-badge-paid";
            case "Overdue":
                return "clay-badge-overdue";
            default:
                return "clay-badge-pending";
        }
    };

    const getClientName = (invoice: Invoice) => {
        if (invoice.to?.name) {
            return invoice.to.name;
        }
        if (invoice.clientName) {
            return invoice.clientName;
        }
        return 'Unknown Client';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#92487A]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
                    <p className="text-gray-500 mt-1">Manage and track your invoices</p>
                </div>
                <Link href="/invoices/new" className="clay-btn flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    Create Invoice
                </Link>
            </div>

            {invoices.length === 0 ? (
                <div className="clay-card p-12 text-center">
                    <svg className="mx-auto h-16 w-16 text-[#9E9E9E] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-[#6B6B6B] text-lg mb-4">No invoices found</p>
                    
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {invoices.map((invoice) => (
                        <div key={invoice._id} className="clay-card p-6 group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs text-[#9E9E9E] font-semibold uppercase">Invoice</p>
                                    <h3 className="text-lg font-bold text-[#2D2D2D]">#{invoice.invoiceNumber}</h3>
                                </div>
                                <span className={getStatusBadgeClass(invoice.status)}>
                                    {invoice.status}
                                </span>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-[#6B6B6B]">Client</p>
                                <p className="text-base font-semibold text-[#2D2D2D]">{getClientName(invoice)}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-[#6B6B6B]">Amount</p>
                                <p className="text-2xl font-bold gradient-text-clay">
                                    {currencySymbols[invoice.currency] || '$'}{invoice.amount.toFixed(2)}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                <div>
                                    <p className="text-[#9E9E9E]">Issue Date</p>
                                    <p className="text-[#2D2D2D] font-medium">{formatDate(invoice.issueDate)}</p>
                                </div>
                                <div>
                                    <p className="text-[#9E9E9E]">Due Date</p>
                                    <p className="text-[#2D2D2D] font-medium">{formatDate(invoice.dueDate)}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-gray-200">
                                <Link
                                    href={`/invoices/${invoice._id}/edit`}
                                    className="flex-1 text-center py-2 px-4 rounded-xl bg-[#E8DFF5]/50 text-[#92487A] font-semibold hover:bg-[#E8DFF5] transition text-sm"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(invoice._id)}
                                    className="flex-1 py-2 px-4 rounded-xl bg-rose-50 text-rose-600 font-semibold hover:bg-rose-100 transition text-sm"
                                >
                                    Delete
                                </button>

                                
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

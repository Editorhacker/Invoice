"use client";

import React from 'react';
import { Invoice, currencySymbols } from '@/types/invoice';

interface InvoicePDFTemplateProps {
    invoice: Invoice;
}

/**
 * This component is specifically designed for PDF generation.
 * It uses only inline styles and basic CSS to avoid Tailwind's modern color functions
 * that html2canvas cannot parse.
 */
export const InvoicePDFTemplate: React.FC<InvoicePDFTemplateProps> = ({ invoice }) => {
    const currencySymbol = currencySymbols[invoice.currency] || '$';

    const formatCurrency = (amount: number) => {
        return `${currencySymbol}${amount.toFixed(2)}`;
    };

    const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
    const taxAmount = subtotal * (invoice.taxRate / 100);
    const total = subtotal + taxAmount;

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString + 'T00:00:00');
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const styles = {
        container: {
            backgroundColor: '#ffffff',
            padding: '48px',
            fontFamily: 'Arial, sans-serif',
            color: '#2D2D2D',
            maxWidth: '800px',
            margin: '0 auto',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '40px',
        },
        logo: {
            height: '64px',
            maxWidth: '300px',
            objectFit: 'contain' as const,
            marginBottom: '16px',
        },
        invoiceTitle: {
            fontSize: '36px',
            fontWeight: 'bold',
            color: invoice.accentColor,
            margin: '0',
        },
        invoiceNumber: {
            color: '#6B6B6B',
            marginTop: '4px',
            fontSize: '14px',
        },
        companyName: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#2D2D2D',
            margin: '0',
        },
        text: {
            fontSize: '14px',
            color: '#6B6B6B',
            margin: '4px 0',
            whiteSpace: 'pre-line' as const,
        },
        gridContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            marginBottom: '40px',
        },
        sectionTitle: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#9E9E9E',
            textTransform: 'uppercase' as const,
            marginBottom: '8px',
        },
        clientName: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2D2D2D',
            margin: '0 0 8px 0',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse' as const,
            marginBottom: '32px',
        },
        tableHeader: {
            color: invoice.accentColor,
            textAlign: 'left' as const,
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '12px 16px',
            borderBottom: `2px solid ${invoice.accentColor}`,
        },
        tableHeaderRight: {
            color: invoice.accentColor,
            textAlign: 'right' as const,
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '12px 16px',
            borderBottom: `2px solid ${invoice.accentColor}`,
        },
        tableCell: {
            padding: '16px',
            fontSize: '14px',
            color: '#2D2D2D',
            borderBottom: '1px solid #E5E7EB',
        },
        tableCellRight: {
            padding: '16px',
            fontSize: '14px',
            color: '#6B6B6B',
            textAlign: 'right' as const,
            borderBottom: '1px solid #E5E7EB',
        },
        totalsContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '40px',
        },
        totalsBox: {
            width: '300px',
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
        },
        totalLabel: {
            fontSize: '14px',
            color: '#6B6B6B',
        },
        totalValue: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#2D2D2D',
        },
        grandTotalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '12px',
            marginTop: '8px',
            borderTop: `2px solid ${invoice.accentColor}`,
        },
        grandTotalLabel: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2D2D2D',
        },
        grandTotalValue: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: invoice.accentColor,
        },
        notesSection: {
            paddingTop: '24px',
            borderTop: '1px solid #E5E7EB',
        },
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    {invoice.logo && (
                        <img src={invoice.logo} alt="Company Logo" style={styles.logo} />
                    )}
                    <h1 style={styles.invoiceTitle}>INVOICE</h1>
                    <p style={styles.invoiceNumber}># {invoice.invoiceNumber}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h2 style={styles.companyName}>{invoice.from.name}</h2>
                    <p style={styles.text}>{invoice.from.address}</p>
                    <p style={styles.text}>{invoice.from.email}</p>
                </div>
            </div>

            {/* Bill To & Dates */}
            <div style={styles.gridContainer}>
                <div>
                    <h3 style={styles.sectionTitle}>Bill To</h3>
                    <h4 style={styles.clientName}>{invoice.to.name}</h4>
                    <p style={styles.text}>{invoice.to.address}</p>
                    <p style={styles.text}>{invoice.to.email}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: '12px' }}>
                        <p style={styles.sectionTitle}>Issue Date</p>
                        <p style={{ ...styles.text, fontWeight: '600', color: '#2D2D2D' }}>
                            {formatDate(invoice.issueDate)}
                        </p>
                    </div>
                    <div>
                        <p style={styles.sectionTitle}>Due Date</p>
                        <p style={{ ...styles.text, fontWeight: '600', color: '#2D2D2D' }}>
                            {formatDate(invoice.dueDate)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Item</th>
                        <th style={styles.tableHeaderRight}>Qty</th>
                        <th style={styles.tableHeaderRight}>Rate</th>
                        <th style={styles.tableHeaderRight}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.items.map((item, index) => (
                        <tr key={item.id}>
                            <td style={styles.tableCell}>
                                {item.description || 'Untitled Item'}
                            </td>
                            <td style={styles.tableCellRight}>{item.quantity}</td>
                            <td style={styles.tableCellRight}>{formatCurrency(item.rate)}</td>
                            <td style={{ ...styles.tableCellRight, fontWeight: '600', color: '#2D2D2D' }}>
                                {formatCurrency(item.quantity * item.rate)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div style={styles.totalsContainer}>
                <div style={styles.totalsBox}>
                    <div style={styles.totalRow}>
                        <span style={styles.totalLabel}>Subtotal</span>
                        <span style={styles.totalValue}>{formatCurrency(subtotal)}</span>
                    </div>
                    <div style={styles.totalRow}>
                        <span style={styles.totalLabel}>Tax ({invoice.taxRate}%)</span>
                        <span style={styles.totalValue}>{formatCurrency(taxAmount)}</span>
                    </div>
                    <div style={styles.grandTotalRow}>
                        <span style={styles.grandTotalLabel}>Total</span>
                        <span style={styles.grandTotalValue}>{formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
                <div style={styles.notesSection}>
                    <h3 style={styles.sectionTitle}>Notes</h3>
                    <p style={styles.text}>{invoice.notes}</p>
                </div>
            )}
        </div>
    );
};

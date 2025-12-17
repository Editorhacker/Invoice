import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { Invoice } from '@/types/invoice';

/**
 * Generates a PDF from an invoice using a clean HTML template
 * This approach avoids Tailwind CSS's modern color functions that html2canvas can't parse
 */
export async function generateInvoicePDF(invoice: Invoice): Promise<void> {
    // Create a temporary container for the PDF template
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px';
    container.style.backgroundColor = '#ffffff';
    document.body.appendChild(container);

    try {
        // Dynamically import React and ReactDOM for rendering
        const React = await import('react');
        const ReactDOM = await import('react-dom/client');
        const { InvoicePDFTemplate } = await import('@/components/InvoicePDFTemplate');

        // Render the PDF template
        const root = ReactDOM.createRoot(container);
        await new Promise<void>((resolve) => {
            root.render(React.createElement(InvoicePDFTemplate, { invoice }));
            // Wait longer for images to load properly
            setTimeout(resolve, 1000);
        });

        // Generate canvas from the rendered template
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            removeContainer: false,
            imageTimeout: 15000,
        });

        // Create PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice-${invoice.invoiceNumber || 'draft'}.pdf`);

        // Cleanup
        root.unmount();
    } catch (error) {
        console.error('Failed to generate PDF:', error);
        throw new Error('PDF generation failed. Please try again.');
    } finally {
        // Remove temporary container
        document.body.removeChild(container);
    }
}

/**
 * Alternative approach: Generate PDF directly from a ref element
 * Use this if you want to capture the preview component as-is
 */
export async function generatePDFFromElement(
    element: HTMLElement,
    filename: string
): Promise<void> {
    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
    } catch (error) {
        console.error('Failed to generate PDF:', error);
        throw new Error('PDF generation failed. Please try again.');
    }
}

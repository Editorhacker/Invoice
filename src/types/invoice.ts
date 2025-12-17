export interface Party {
    name: string;
    email: string;
    address: string;
}

export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
}

export interface Invoice {
    _id?: string;
    invoiceNumber: string;
    from: Party;
    to: Party;
    items: LineItem[];
    amount: number;
    status: 'Pending' | 'Paid' | 'Overdue';
    issueDate: string;
    dueDate: string;
    currency: string;
    taxRate: number;
    notes: string;
    logo: string | null;
    accentColor: string;
}

export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export const currencies: Currency[] = [
    { code: 'USD', name: 'United States Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound Sterling', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: '$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: '$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];

export const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: '$',
    AUD: '$',
    INR: '₹',
};

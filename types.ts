export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  invoiceNumber: string;
  from: {
    name: string;
    address: string;
    email: string;
  };
  to: {
    name: string;
    address: string;
    email: string;
  };
  items: LineItem[];
  notes: string;
  taxRate: number;
  issueDate: string;
  dueDate: string;
  currency: string;
  logo: string | null;
  accentColor: string;
}

export type AuthStatus = 'authenticated' | 'unauthenticated';
export type AuthView = 'landing' | 'login' | 'signup';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

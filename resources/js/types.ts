// --- ENUMS & BASIC TYPES ---
export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';
export type UserRole = 'ADMIN' | 'USER';
export type WalletType = 'CASH' | 'BANK' | 'E-WALLET';

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  TRANSACTIONS = 'TRANSACTIONS',
  SMART_ENTRY = 'SMART_ENTRY',
  INSIGHTS = 'INSIGHTS',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD', // Admin only
  WALLETS = 'WALLETS',
  CATEGORIES = 'CATEGORIES',
  DEBTS = 'DEBTS',
  BUDGETS = 'BUDGETS',
  ASSETS = 'ASSETS',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
  EXPORT = 'EXPORT',
  NOTIFICATIONS = 'NOTIFICATIONS',
  HELP = 'HELP',
  ADMIN = 'ADMIN' // Alias for ADMIN_DASHBOARD if needed
}

// --- CORE INTERFACES ---

export interface Transaction {
  id: string;
  date: string; // ISO String YYYY-MM-DD
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  walletId?: string; // Optional if not using Wallet feature yet
}

export interface SummaryStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

// --- USER & AUTH ---

export interface UserPreferences {
  theme: 'light' | 'dark';
  currency: 'IDR' | 'USD' | 'EUR';
  notifications: boolean;
}

export interface FinancialGoal {
  id: string;
  name: string;
  amount: number;
  currentAmount?: number;
  deadline: string; // YYYY-MM-DD
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  preferences?: UserPreferences;
  goals?: FinancialGoal[];
}

// Alias agar kompatibel dengan kode FinanceApp.tsx
export type UserProfile = User;
export type Goal = FinancialGoal;

// --- FEATURES ---

export interface CategoryBudget {
  category: string;
  limit: number;
  spent: number;
  period: 'MONTHLY' | 'WEEKLY';
}

export interface Asset {
  id: string;
  name: string;
  value: number;
  type: 'PROPERTY' | 'VEHICLE' | 'INVESTMENT' | 'CASH' | 'OTHER';
  purchaseDate?: string;
}

export interface Debt {
  id: string;
  name: string;
  amount: number;
  remainingAmount: number;
  dueDate: string;
  interestRate?: number;
  description?: string;
  type: 'PAYABLE' | 'RECEIVABLE'; // <--- TAMBAHAN PENTING (Hutang vs Piutang)
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';
}

// --- CONSTANTS ---

export const CATEGORIES = {
  INCOME: ['Gaji', 'Bonus', 'Investasi', 'Lainnya'],
  EXPENSE: ['Makanan', 'Transportasi', 'Belanja', 'Tagihan', 'Hiburan', 'Kesehatan', 'Pendidikan', 'Lainnya']
};

export const INITIAL_CATEGORIES = [
  { name: 'Gaji', type: 'INCOME' },
  { name: 'Makanan', type: 'EXPENSE' },
  { name: 'Transportasi', type: 'EXPENSE' },
  { name: 'Belanja', type: 'EXPENSE' },
];

export interface Wallet {
  id: string;
  userId: string;
  name: string;
  type: WalletType;
  balance: number;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  limit?: number; // Opsional (untuk budget)
  isDefault?: boolean;
}

export interface AdminLog {
  id: string;
  timestamp: string; // ISO String
  adminId: string;
  action: string;
  target: string;
  details: string;
}
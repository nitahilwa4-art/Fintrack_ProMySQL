// --- ENUMS & BASIC TYPES ---
export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';
export type UserRole = 'ADMIN' | 'USER';
export type WalletType = 'CASH' | 'BANK' | 'E-WALLET';

export type BudgetFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type DebtType = 'BILL' | 'DEBT' | 'RECEIVABLE';


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
  userId: string;
  date: string; // YYYY-MM-DD
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  walletId: string;
  toWalletId?: string; // khusus TRANSFER
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
  id: string;                 // <-- tambah, dipakai di FinanceApp
  userId?: string;            // opsional (biar kompatibel saat nanti pakai auth)
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
  userId: string;
  person: string;
  amount: number;
  remainingAmount?: number; // Added to track remaining debt
  dueDate: string; // YYYY-MM-DD
  description?: string;
  type: DebtType;
  isPaid: boolean;
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

export interface Budget {
  id: string;
  userId: string;
  category: string;
  limit: number;
  period: string; // contoh: "2026-02" (YYYY-MM)
  frequency: BudgetFrequency;
}

import { AxiosInstance } from 'axios';
// PERBAIKAN: Import spesifik 'route' dan 'Config'
import { route as routeFn, Config } from 'ziggy-js'; 

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    // Definisikan tipe route secara global
    var route: typeof routeFn;
    var Ziggy: Config;
}
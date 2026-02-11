// --- ENUMS & BASIC TYPES ---
export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';
export type UserRole = 'ADMIN' | 'USER';
export type WalletType = 'CASH' | 'BANK' | 'E-WALLET';
export type BudgetFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type DebtType = 'BILL' | 'DEBT' | 'RECEIVABLE';
// Sesuaikan AssetType dengan yang ada di AssetManager
export type AssetType = 'GOLD' | 'STOCK' | 'CRYPTO' | 'PROPERTY' | 'OTHER';
export type Notification = AppNotification;

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  TRANSACTIONS = 'TRANSACTIONS',
  SMART_ENTRY = 'SMART_ENTRY',
  INSIGHTS = 'INSIGHTS',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  WALLETS = 'WALLETS',
  CATEGORIES = 'CATEGORIES',
  DEBTS = 'DEBTS',
  BUDGETS = 'BUDGETS',
  ASSETS = 'ASSETS',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
  EXPORT = 'EXPORT',
  NOTIFICATIONS = 'NOTIFICATIONS',
  HELP = 'HELP'
}

export interface Transaction {
  id: string;
  userId: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  walletId: string;
  toWalletId?: string;
}

export interface SummaryStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  password?: string;
}

export interface Asset {
  id: string;
  userId: string;
  name: string;
  value: number;
  type: AssetType; // Gunakan AssetType yang sudah diupdate
  purchaseDate?: string;
}

export interface Debt {
  id: string;
  userId: string;
  person: string;
  amount: number;
  remainingAmount?: number;
  dueDate: string;
  description?: string;
  type: DebtType;
  isPaid: boolean;
}

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
  isDefault?: boolean;
}

// SATUKAN DEFINISI BUDGET (Hapus CategoryBudget)
export interface Budget {
  id: string;
  userId: string;
  category: string;
  limit: number;
  spent: number;
  period: string;
  frequency: BudgetFrequency;
}

import { AxiosInstance } from 'axios';
import { route as routeFn, Config } from 'ziggy-js'; 

declare global {
    interface Window { axios: AxiosInstance; }
    var route: typeof routeFn;
    var Ziggy: Config;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean; // Disamakan dengan penggunaan di Layout
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR' | 'ALERT'; // Tambahkan ALERT
}
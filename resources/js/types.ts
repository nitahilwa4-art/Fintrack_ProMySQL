// --- ENUMS & BASIC TYPES ---
export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';
export type UserRole = 'ADMIN' | 'USER';
export type WalletType = 'CASH' | 'BANK' | 'E-WALLET';
export type BudgetFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type DebtType = 'BILL' | 'DEBT' | 'RECEIVABLE';
export type AssetType = 'GOLD' | 'STOCK' | 'CRYPTO' | 'PROPERTY' | 'OTHER';

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
  HELP = 'HELP',
  ADMIN = 'ADMIN' // Alias for ADMIN_DASHBOARD if needed,
}

// --- CONSTANTS (INI YANG TADI HILANG) ---
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

// --- CORE INTERFACES ---

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
  isFlagged?: boolean; // <-- TAMBAHAN: Untuk fitur Admin Flagging
  status?: 'PENDING' | 'COMPLETED' | 'FAILED'; // <-- TAMBAHAN: Status transaksi
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
  deadline: string; 
}

// Alias untuk kompatibilitas
export type Goal = FinancialGoal;
export type UserProfile = User;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  preferences?: UserPreferences; // Dikembalikan untuk Settings
  goals?: FinancialGoal[];       // Dikembalikan untuk fitur Goals
  password?: string;             // Ditambah untuk Mock Profile Update
}

// --- FEATURES ---

export interface Asset {
  id: string;
  userId: string;
  name: string;
  value: number;
  type: AssetType; 
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

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR' | 'ALERT';
}
// Alias agar import Notification tidak error
export type Notification = AppNotification;

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

export interface AdminLog {
  id: string;
  timestamp: string;
  adminId: string;
  action: string;
  target: string;
  details: string;
}
export type SystemLog = AdminLog;
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

// --- GLOBAL DEFINITIONS ---
import { AxiosInstance } from 'axios';
import { route as routeFn, Config } from 'ziggy-js'; 

declare global {
    interface Window { axios: AxiosInstance; }
    var route: typeof routeFn;
    var Ziggy: Config;
}
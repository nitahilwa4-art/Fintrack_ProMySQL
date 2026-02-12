import React, { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react'; // <--- Tambah 'router'
import WalletManager from '@/Components/FinTrack/WalletManager';
import CategoryManager from '@/Components/FinTrack/CategoryManager';
import NotificationCenter from '@/Components/FinTrack/NotificationCenter';

// Import Types
import { 
  Transaction, 
  AppView, 
  SummaryStats, 
  UserProfile, 
  Wallet,
  Category,
  
  Goal, 
  Asset, 
  Debt,
  Budget // Gunakan Budget jika CategoryBudget tidak ada
} from '@/types';

// Import Components
import Layout from '@/Components/FinTrack/Layout';
import Dashboard from '@/Components/FinTrack/Dashboard';
import TransactionList from '@/Components/FinTrack/TransactionList';
import SmartEntry from '@/Components/FinTrack/SmartEntry';
import FinancialInsights from '@/Components/FinTrack/FinancialInsights';
import BudgetManager from '@/Components/FinTrack/BudgetManager';

import Settings from '@/Components/FinTrack/Settings';
import ExportPage from '@/Components/FinTrack/ExportPage';
import Profile from '@/Components/FinTrack/Profile';
import AdminDashboard from '@/Components/FinTrack/AdminDashboard';
import AssetManager from '@/Components/FinTrack/AssetManager';
import DebtManager from '@/Components/FinTrack/DebtManager';
import HelpCenter from '@/Components/FinTrack/HelpCenter';

// Default Data Generators (Sample Data)
const DEFAULT_WALLETS: Wallet[] = [
  { id: 'w1', userId: 'user1', name: 'Dompet Tunai', type: 'CASH', balance: 5000000 },
  { id: 'w2', userId: 'user1', name: 'BCA Utama', type: 'BANK', balance: 15000000 },
  { id: 'w3', userId: 'user1', name: 'GoPay', type: 'E-WALLET', balance: 250000 },
];

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'c1', userId: 'u1', name: 'Gaji', type: 'INCOME', isDefault: true },
  { id: 'c2', userId: 'u1', name: 'Makanan', type: 'EXPENSE', isDefault: true },
  { id: 'c3', userId: 'u1', name: 'Transportasi', type: 'EXPENSE', isDefault: true },
  { id: 'c4', userId: 'u1', name: 'Hiburan', type: 'EXPENSE', isDefault: true },
  { id: 'c5', userId: 'u1', name: 'Tagihan', type: 'EXPENSE', isDefault: true },
];

// PERBAIKAN 2: Definisi Tipe Props dari Laravel
interface PageProps {
    auth: {
        user: UserProfile;
    };
    [key: string]: any; //
}

const FinanceApp: React.FC = () => {
  // PERBAIKAN 3: Ambil Data User Langsung dari Laravel
  const { auth } = usePage<PageProps>().props;

  // --- STATE MANAGEMENT ---
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  
  // PERBAIKAN 4: Inisialisasi status login berdasarkan data Laravel
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth.user);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeDateRange, setActiveDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
  });
  
  // Data States
  const [userProfile, setUserProfile] = useState<UserProfile | null>(auth.user || null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>(DEFAULT_WALLETS);
  const [budgets, setBudgets] = useState<Budget[]>([]); // Gunakan tipe Budget
  const [goals, setGoals] = useState<Goal[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  // PERBAIKAN 5: Sync otomatis jika user login/logout
  useEffect(() => {
    if (auth.user) {
        setUserProfile(auth.user);
        setIsAuthenticated(true);
    }
  }, [auth.user]);

  // --- INITIALIZATION ---
  useEffect(() => {
    setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          // Kita abaikan localStorage userProfile karena sudah pakai auth.user dari Laravel
          const savedTheme = localStorage.getItem('theme');

          if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
          }

          // Load Data Lainnya
          const savedTrans = localStorage.getItem('transactions');
          const savedWallets = localStorage.getItem('wallets');
          const savedBudgets = localStorage.getItem('budgets');
          const savedGoals = localStorage.getItem('goals');
          const savedAssets = localStorage.getItem('assets');
          const savedDebts = localStorage.getItem('debts');
          const savedCats = localStorage.getItem('categories');

          if (savedTrans) setTransactions(JSON.parse(savedTrans));
          if (savedWallets) setWallets(JSON.parse(savedWallets));
          if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
          if (savedGoals) setGoals(JSON.parse(savedGoals));
          if (savedAssets) setAssets(JSON.parse(savedAssets));
          if (savedDebts) setDebts(JSON.parse(savedDebts));
          if (savedCats) setCategories(JSON.parse(savedCats));
        }
      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setIsLoading(false);
      }
    }, 800);
  }, []);

  // --- PERSISTENCE ---
  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('wallets', JSON.stringify(wallets));
    localStorage.setItem('budgets', JSON.stringify(budgets));
    localStorage.setItem('goals', JSON.stringify(goals));
    localStorage.setItem('assets', JSON.stringify(assets));
    localStorage.setItem('debts', JSON.stringify(debts));
    localStorage.setItem('categories', JSON.stringify(categories));
    
    // Theme persistence
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [transactions, wallets, budgets, goals, assets, debts, categories, isDarkMode, isLoading]);

  // --- HANDLERS ---
  const handleLogin = (user: UserProfile) => {
    // Fungsi ini hanya fallback, login utama via Laravel
    setUserProfile(user);
    setIsAuthenticated(true);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    // Meminta Laravel untuk mematikan sesi (Logout Server)
    router.post(route('logout'));
  };

  const stats: SummaryStats = {
    totalIncome: transactions.filter(t => t.type === 'INCOME').reduce((acc, curr) => acc + curr.amount, 0),
    totalExpense: transactions.filter(t => t.type === 'EXPENSE').reduce((acc, curr) => acc + curr.amount, 0),
    get balance() { return this.totalIncome - this.totalExpense; }
  };

  const addTransaction = (newTrans: Transaction | Omit<Transaction, 'userId'>) => {
    const t = { ...newTrans, userId: userProfile?.id || 'guest' } as Transaction;
    setTransactions(prev => [t, ...prev]);
    setWallets(prev => prev.map(w => {
      if (w.id === t.walletId) {
        if (t.type === 'INCOME') return { ...w, balance: w.balance + t.amount };
        if (t.type === 'EXPENSE') return { ...w, balance: w.balance - t.amount };
        if (t.type === 'TRANSFER') return { ...w, balance: w.balance - t.amount };
      }
      if (t.type === 'TRANSFER' && w.id === t.toWalletId) {
        return { ...w, balance: w.balance + t.amount };
      }
      return w;
    }));
  };

  const addSmartTransactions = (newTrans: Omit<Transaction, 'userId'>[]) => {
    const transactionsWithUser = newTrans.map(t => ({
        ...t,
        userId: userProfile?.id || 'guest'
    } as Transaction));
    setTransactions(prev => [...transactionsWithUser, ...prev]);
  };

  // --- BUDGET HANDLERS ---
  const handleAddBudget = (newBudget: Budget) => { // Sesuaikan tipe ke Budget
    setBudgets(prev => [...prev, newBudget]);
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  };

  const handleEditBudget = (updatedBudget: Budget) => { // Sesuaikan tipe ke Budget
    setBudgets(prev => prev.map(b => b.id === updatedBudget.id ? updatedBudget : b));
  };

  // --- WALLET HANDLERS ---
  const handleAddWallet = (newWallet: Wallet) => {
    setWallets(prev => [...prev, newWallet]);
  };

  const handleEditWallet = (updatedWallet: Wallet) => {
    setWallets(prev => prev.map(w => w.id === updatedWallet.id ? updatedWallet : w));
  };

  const handleDeleteWallet = (id: string) => {
    setWallets(prev => prev.filter(w => w.id !== id));
  };

  // --- CATEGORY HANDLERS ---
  const handleAddCategory = (newCat: Category) => {
    setCategories(prev => [...prev, newCat]);
  };
  const handleEditCategory = (updatedCat: Category) => {
    setCategories(prev => prev.map(c => c.id === updatedCat.id ? updatedCat : c));
  };
  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // --- DEBT HANDLERS ---
  const handleAddDebt = (newDebt: Debt) => {
    setDebts(prev => [...prev, newDebt]);
  };
  const handleUpdateDebt = (updatedDebt: Debt) => {
    setDebts(prev => prev.map(d => d.id === updatedDebt.id ? updatedDebt : d));
  };
  const handleDeleteDebt = (id: string) => {
    setDebts(prev => prev.filter(d => d.id !== id));
  };
  const handleTogglePaidDebt = (id: string) => {
      setDebts(prev => prev.map(d => d.id === id ? {...d, isPaid: !d.isPaid} : d));
  };

  // --- RENDER CONTENT ---
  const renderContent = () => {
    // 1. Handle Loading
    if (isLoading) {
      return (
        <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      );
    }

    // PERBAIKAN 6: Hapus pengecekan manual yang memblokir tampilan
    // if (!isAuthenticated) { return <Auth ... /> } <--- INI SUDAH DIHAPUS

    // 2. Routing Views
    switch (currentView) {
      case AppView.ADMIN_DASHBOARD:
         return <AdminDashboard allTransactions={transactions} onRefresh={() => {}} />;
         
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            transactions={transactions} 
            stats={stats} 
            wallets={wallets}
            budgets={budgets}
            debts={debts}
            categories={categories}
            onAddTransaction={addTransaction}
            onNavigateToSmartEntry={() => setCurrentView(AppView.SMART_ENTRY)}
            activeDateRange={activeDateRange}
          />
        );
      case AppView.TRANSACTIONS:
        return (
            <TransactionList 
              transactions={transactions} 
              wallets={wallets} 
              categories={categories} 
              onDelete={(id) => setTransactions(prev => prev.filter(t => t.id !== id))} 
              onEdit={(updatedTrans) => setTransactions(prev => prev.map(t => t.id === updatedTrans.id ? updatedTrans : t))}
            />
        );
      case AppView.SMART_ENTRY:
        return <SmartEntry onAddTransactions={addSmartTransactions} onDone={() => setCurrentView(AppView.TRANSACTIONS)} />;
      case AppView.INSIGHTS:
        return <FinancialInsights transactions={transactions} />;
      case AppView.BUDGETS:
        return <BudgetManager 
            budgets={budgets}
            categories={categories}
            onAdd={handleAddBudget}
            onDelete={handleDeleteBudget}
            onEdit={handleEditBudget}
          />;
      case AppView.WALLETS:
        return (
          <WalletManager 
            wallets={wallets} 
            onAdd={handleAddWallet} 
            onEdit={handleEditWallet} 
            onDelete={handleDeleteWallet} 
          />
        );
      case AppView.CATEGORIES:
        return (
          <CategoryManager 
            categories={categories} 
            onAdd={handleAddCategory} 
            onEdit={handleEditCategory} 
            onDelete={handleDeleteCategory} 
          />
        );
      case AppView.ASSETS:
        return (
          <AssetManager 
            assets={assets} 
            onAdd={(a) => setAssets(prev => [...prev, a])} 
            onDelete={(id) => setAssets(prev => prev.filter(a => a.id !== id))}
            onEdit={(a) => setAssets(prev => prev.map(item => item.id === a.id ? a : item))}
          />
        );
      case AppView.DEBTS:
        return (
          <DebtManager 
            debts={debts} 
            onAdd={(d) => setDebts(prev => [...prev, d])} 
            onEdit={(d) => setDebts(prev => prev.map(item => item.id === d.id ? d : item))}
            onDelete={(id) => setDebts(prev => prev.filter(d => d.id !== id))}
            onTogglePaid={handleTogglePaidDebt}
          />
        );
      case AppView.PROFILE:
        if (!userProfile) return null;
        return <Profile user={userProfile} onUpdateUser={setUserProfile} />;
      case AppView.SETTINGS:
        if (!userProfile) return null;
        return <Settings 
            user={userProfile!} 
            onUpdateUser={(updatedUser) => {
              setUserProfile(updatedUser);
              if(updatedUser.preferences?.theme === 'dark') {
                setIsDarkMode(true);
                document.documentElement.classList.add('dark');
              } else {
                setIsDarkMode(false);
                document.documentElement.classList.remove('dark');
              }
            }} 
          />;
      case AppView.NOTIFICATIONS:
        return <NotificationCenter />;
      case AppView.EXPORT:
        return <ExportPage transactions={transactions} wallets={wallets} />;
      case AppView.HELP:
        return <HelpCenter />;
      default:
        return <div className="p-10 text-center">Halaman dalam pengembangan</div>;
    }
  };

  // --- MAIN RENDER ---
  if (auth.user || isAuthenticated) {
    return (
      <>
        <Head title="FinTrack Pro" />
        <Layout 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          user={userProfile}
          onLogout={handleLogout}
        >
          {renderContent()}
        </Layout>
      </>
    );
  }

  // GANTI BAGIAN 'return null' DENGAN INI:
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="text-center p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sesi Tidak Ditemukan</h1>
        <p className="text-gray-500 mb-6">Anda sepertinya belum login atau sesi telah berakhir.</p>
        
        {/* Tombol Paksa ke Halaman Login */}
        <a 
          href="/login" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          Masuk Sekarang
        </a>
      </div>
    </div>
  );
}; // <--- Tutup kurung FinanceApp

export default FinanceApp;
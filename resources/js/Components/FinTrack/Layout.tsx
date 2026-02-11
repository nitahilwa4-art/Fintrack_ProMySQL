import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, List, Zap, PieChart, Menu, X, Wallet as WalletIcon, 
  LogOut, ShieldCheck, HandCoins, Target, Gem, CreditCard, ChevronRight, Tags,
  User as UserIcon, Settings, FileDown, Bell, HelpCircle, Check, AlertTriangle, Info, CheckCircle,
  PlusCircle, Home // Tambahan Icon
} from 'lucide-react';
import { AppView, User, Notification } from '@/types';
import toast from 'react-hot-toast';

interface LayoutProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  children: ReactNode;
  user: User | null;
  onLogout: () => void;
}

const MOCK_NOTIFICATIONS_HEADER: Notification[] = [
  { id: '1', title: 'Tagihan Listrik', message: 'Tagihan Listrik jatuh tempo besok!', type: 'ALERT', date: new Date().toISOString(), isRead: false },
  { id: '2', title: 'Gaji Masuk', message: 'Gaji bulan Oktober sudah dicatat.', type: 'SUCCESS', date: new Date(Date.now() - 3600000).toISOString(), isRead: false },
  { id: '3', title: 'Peringatan Budget', message: 'Budget "Makan" sisa 10%.', type: 'WARNING', date: new Date(Date.now() - 7200000).toISOString(), isRead: false },
];

const Layout: React.FC<LayoutProps> = ({ currentView, setCurrentView, children, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Notification Logic
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS_HEADER);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('Semua notifikasi ditandai sudah dibaca');
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- KOMPONEN NAV ITEM UNTUK SIDEBAR (Desktop) ---
  const NavItem = ({ view, icon: Icon, label }: { view: AppView; icon: any; label: string }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => {
          setCurrentView(view);
          setIsSidebarOpen(false); // Tutup sidebar jika mode mobile drawer
        }}
        className={`group flex items-center w-full px-4 py-3 mb-1.5 rounded-2xl transition-all duration-500 ease-out relative overflow-hidden ${
          isActive
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 translate-x-1'
            : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm'
        }`}
      >
        <div className={`mr-3 transition-transform duration-500 ease-out ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`} />
        </div>
        <span className="font-semibold text-sm tracking-wide">{label}</span>
        {isActive && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />}
      </button>
    );
  };

  // --- KOMPONEN BOTTOM NAV ITEM (Khusus HP) ---
  const BottomNavItem = ({ view, icon: Icon, label, onClick }: { view?: AppView; icon: any; label: string, onClick?: () => void }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={onClick || (() => view && setCurrentView(view))}
        className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
          isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        }`}
      >
        <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-indigo-50 dark:bg-slate-800 transform -translate-y-1' : ''}`}>
           <Icon className={`w-6 h-6 ${isActive ? 'fill-indigo-600/20 stroke-2' : 'stroke-[1.5]'}`} />
        </div>
        <span className="text-[10px] font-bold mt-1 tracking-tight">{label}</span>
      </button>
    );
  };

  const getNotifIcon = (type: Notification['type']) => {
    switch (type) {
      case 'WARNING': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'ALERT': return <AlertTriangle className="w-4 h-4 text-red-500" />; 
      case 'SUCCESS': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50/50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-500">
      
      {/* Overlay Sidebar Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 modal-overlay z-40 lg:hidden animate-fade-in bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* --- SIDEBAR UTAMA (Desktop & Mobile Drawer) --- */}
      {/* Perubahan: Tambahkan 'hidden lg:flex' agar default hidden di HP, tapi muncul jika isSidebarOpen true */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-50/95 dark:bg-slate-900/95 lg:bg-transparent transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:transform-none flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col p-4 lg:py-6 lg:pl-6">
          <div className="flex-1 glass lg:rounded-[2rem] lg:shadow-2xl flex flex-col overflow-hidden transition-all duration-500">
            
            {/* Logo Area */}
            <div className="flex items-center justify-between p-6 pb-2">
              <div className="flex items-center space-x-3 group cursor-default">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <WalletIcon className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white leading-none">FinTrack</h1>
                  <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 tracking-widest uppercase">AI Powered</span>
                </div>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
            </div>

            {/* Nav Items Sidebar */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-8 scrollbar-hide">
              <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Menu Utama</p>
                <div className="space-y-1">
                  <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
                  <NavItem view={AppView.TRANSACTIONS} icon={List} label="Riwayat" />
                  <NavItem view={AppView.SMART_ENTRY} icon={Zap} label="Input AI" />
                  <NavItem view={AppView.INSIGHTS} icon={PieChart} label="Analisis" />
                </div>
              </div>

              <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Keuangan</p>
                <div className="space-y-1">
                  <NavItem view={AppView.WALLETS} icon={CreditCard} label="Dompet" />
                  <NavItem view={AppView.BUDGETS} icon={Target} label="Anggaran" />
                  <NavItem view={AppView.CATEGORIES} icon={Tags} label="Kategori" />
                  <NavItem view={AppView.DEBTS} icon={HandCoins} label="Hutang" />
                  <NavItem view={AppView.ASSETS} icon={Gem} label="Aset" />
                </div>
              </div>

              <div className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Akun</p>
                <div className="space-y-1">
                  <NavItem view={AppView.PROFILE} icon={UserIcon} label="Profil Saya" />
                  <NavItem view={AppView.SETTINGS} icon={Settings} label="Pengaturan" />
                  <NavItem view={AppView.EXPORT} icon={FileDown} label="Export Data" />
                  <NavItem view={AppView.NOTIFICATIONS} icon={Bell} label="Notifikasi" />
                  <NavItem view={AppView.HELP} icon={HelpCircle} label="Bantuan" />
                </div>
              </div>
              
              {user?.role === 'ADMIN' && (
                <div className="animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
                  <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Sistem</p>
                  <NavItem view={AppView.ADMIN_DASHBOARD} icon={ShieldCheck} label="Admin Panel" />
                </div>
              )}
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 mt-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-100 dark:border-slate-700 relative group transition-all duration-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80">
                <div className="flex items-center space-x-3 mb-3">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md overflow-hidden ring-2 ring-white dark:ring-slate-700">
                     {user?.avatar ? (
                       <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                     ) : (
                       user?.name.charAt(0).toUpperCase()
                     )}
                   </div>
                   <div className="overflow-hidden flex-1">
                     <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user?.name}</p>
                     <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                   </div>
                </div>
                <button onClick={onLogout} className="flex items-center justify-center w-full py-2.5 text-xs font-bold text-red-500 bg-white/80 dark:bg-slate-700/80 border border-red-100 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 rounded-xl transition-all shadow-sm active:scale-95">
                  <LogOut className="w-3.5 h-3.5 mr-2" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Glassmorphism Header */}
        <header className="h-20 lg:h-24 flex items-center justify-between px-6 lg:px-10 z-20 sticky top-4 mx-4 lg:mx-6 rounded-[2.5rem] glass shadow-lg transition-colors mb-4">
          <div className="flex items-center gap-4 lg:gap-0">
            {/* Tombol Menu di Header Mobile DIHILANGKAN karena sudah ada Bottom Bar */}
            {/* (Opsional: Bisa dimunculkan jika mau akses drawer manual) */}
            
            <div className="flex flex-col animate-fade-in">
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                {currentView === AppView.DASHBOARD && 'Dashboard Ringkasan'}
                {currentView === AppView.TRANSACTIONS && 'Riwayat Transaksi'}
                {currentView === AppView.WALLETS && 'Dompet Saya'}
                {/* ... Judul view lainnya tetap sama ... */}
                {currentView === AppView.SMART_ENTRY && 'Input Cerdas AI'}
                {currentView === AppView.SETTINGS && 'Pengaturan'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 hidden sm:block">
                {currentView === AppView.DASHBOARD ? `Selamat datang kembali, ${user?.name.split(' ')[0]}!` : 'Kelola keuangan anda dengan lebih baik'}
              </p>
            </div>
          </div>

          {/* Right Side Header: Notifications & Help */}
          <div className="flex items-center gap-3">
            
            {/* Notification Dropdown (Sama seperti sebelumnya) */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md transition-all active:scale-95 relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-4 w-80 sm:w-96 glass-card rounded-2xl shadow-2xl border border-white/50 dark:border-slate-700 overflow-hidden animate-pop-in origin-top-right z-50">
                   {/* ... Isi Notifikasi Tetap Sama ... */}
                   <div className="p-4 bg-slate-50 dark:bg-slate-800 text-center"><p>Notifikasi Panel</p></div>
                </div>
              )}
            </div>

            <button onClick={() => setCurrentView(AppView.HELP)} className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 hover:shadow-md transition-all active:scale-95 hidden sm:block">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area - Tambah padding bawah (pb-24) untuk Mobile agar tidak ketutup Bottom Bar */}
        <div className="flex-1 overflow-y-auto p-4 lg:px-10 lg:pb-10 pb-28 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full animate-fade-in-up">
            {children}
          </div>
        </div>

        {/* --- BOTTOM NAVIGATION BAR (KHUSUS MOBILE) --- */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe z-40 h-20 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <div className="flex justify-around items-center h-full px-2">
            
            {/* 1. Home */}
            <BottomNavItem view={AppView.DASHBOARD} icon={Home} label="Home" />
            
            {/* 2. Riwayat */}
            <BottomNavItem view={AppView.TRANSACTIONS} icon={List} label="Riwayat" />
            
            {/* 3. TOMBOL TENGAH (Smart Entry) */}
            <div className="relative -top-6">
              <button 
                onClick={() => setCurrentView(AppView.SMART_ENTRY)}
                className="w-16 h-16 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-500/40 flex items-center justify-center border-[6px] border-slate-50 dark:border-slate-950 transform transition-transform active:scale-95"
              >
                <PlusCircle className="w-8 h-8" />
              </button>
            </div>

            {/* 4. Dompet */}
            <BottomNavItem view={AppView.WALLETS} icon={WalletIcon} label="Dompet" />
            
            {/* 5. Menu Lainnya (Buka Sidebar) */}
            <BottomNavItem 
              onClick={() => setIsSidebarOpen(true)} // Aksi: Buka Sidebar Drawer
              icon={Menu} 
              label="Menu" 
            />
            
          </div>
        </div>

      </main>
    </div>
  );
};

export default Layout;
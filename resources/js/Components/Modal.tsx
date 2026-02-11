import React, { useEffect, useState } from 'react';

type Props = {
    show: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    closeable?: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({
    show,
    maxWidth = '2xl',
    closeable = true,
    onClose,
    children,
}: Props) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden'; // Kunci scroll layar belakang
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!isVisible && !show) return null;

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        // OVERLAY UTAMA (Fixed memenuhi layar)
        <div className={`fixed inset-0 z-[999] overflow-y-auto transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            
            {/* WRAPPER POSISI (Bawah di HP, Tengah di Laptop) */}
            <div className="flex min-h-screen items-end justify-center p-0 text-center sm:items-center sm:p-4">
                
                {/* BACKDROP GELAP */}
                <div 
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
                    onClick={closeable ? onClose : undefined}
                />

                {/* PANEL MODAL (Ini yang harus melayang) */}
                <div 
                    className={`
                        relative w-full transform overflow-hidden bg-white dark:bg-slate-900 text-left shadow-2xl transition-all duration-300 ease-out
                        
                        /* HP: Full bawah, Rounded atas saja, muncul Slide Up */
                        rounded-t-[30px] sm:rounded-[2rem]
                        ${show ? 'translate-y-0' : 'translate-y-full sm:translate-y-4 sm:scale-95'}
                        
                        /* LAPTOP: Lebar terbatas */
                        ${maxWidthClass}
                    `}
                >
                    {/* Handle Bar untuk Mobile (Garis kecil di atas) */}
                    <div className="flex justify-center pt-4 pb-2 sm:hidden">
                        <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    </div>

                    {/* Konten Form */}
                    <div className="bg-white dark:bg-slate-900">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
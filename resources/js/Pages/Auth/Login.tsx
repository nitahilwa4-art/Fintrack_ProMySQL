import { FormEventHandler, useEffect, ChangeEvent } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Wallet, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    // Helper sederhana
    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as 'email' | 'password', event.target.value);
    };

    return (
        // 1. HAPUS <GuestLayout>, GANTI DENGAN DIV FULLSCREEN INI
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden relative font-sans">
            <Head title="Masuk" />

            {/* Dekorasi Latar Belakang (Bulatan Blur) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-400/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"></div>

            {/* Container Utama (Glass Card) */}
            <div className="w-full flex items-center justify-center px-4 relative z-10">
                <div className="glass-card w-full max-w-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl animate-fade-in-up">
                    
                    {/* Header Logo & Judul */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 mb-4 transform hover:rotate-12 transition-transform duration-500">
                            <Wallet className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                            FinTrack Pro
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
                            Kelola keuangan masa depan Anda
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-xl text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-1">
                            <InputLabel htmlFor="email" value="Email" className="sr-only" />
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={onHandleChange}
                                    placeholder="Masukkan email Anda"
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <InputLabel htmlFor="password" value="Password" className="sr-only" />
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    autoComplete="current-password"
                                    onChange={onHandleChange}
                                    placeholder="Masukkan password"
                                />
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between mt-2">
                            <label className="flex items-center cursor-pointer group">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e: { target: { checked: boolean; }; }) => setData('remember', e.target.checked)}
                                    className="rounded border-slate-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ms-2 text-xs font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">Ingat Saya</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 hover:underline"
                                >
                                    Lupa Password?
                                </Link>
                            )}
                        </div>

                        {/* Tombol Submit Modern */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transform transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Sedang Memproses...
                                </>
                            ) : (
                                <>
                                    Masuk Sekarang
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Register */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Belum punya akun?{' '}
                            <Link 
                                href={route('register')} 
                                className="font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 hover:underline transition-colors ml-1"
                            >
                                Daftar Gratis
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { FormEventHandler, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Wallet, Loader2, LogIn, Lock, Mail } from 'lucide-react';
import Checkbox from '@/Components/Checkbox';

// PERHATIKAN: Tidak ada import GuestLayout di sini!

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

    return (
        // HAPUS <GuestLayout>, GANTI DENGAN DIV FULLSCREEN INI
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <Head title="Masuk" />

            {/* CONTAINER UTAMA (Split Screen) */}
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in-up">
                
                {/* BAGIAN KIRI (Visual & Brand) */}
                <div className="md:w-1/2 bg-indigo-600 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-30"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/10">
                                <Wallet className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">FinTrack Pro</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 leading-tight">
                            Kelola Keuangan dengan Cerdas.
                        </h2>
                        <p className="text-indigo-100 text-lg opacity-90">
                            Pantau pengeluaran, analisis dengan AI, dan capai tujuan finansial Anda bersama kami.
                        </p>
                    </div>
                    
                    <div className="relative z-10 mt-12 text-sm text-indigo-200">
                        &copy; 2026 FinTrack AI Inc.
                    </div>
                </div>

                {/* BAGIAN KANAN (Form Login) */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Selamat Datang Kembali</h3>
                        <p className="text-slate-500">Masuk untuk mengakses dashboard Anda.</p>
                    </div>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        
                        {/* Input Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-800"
                                    placeholder="name@example.com"
                                    autoComplete="username"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Input Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-800"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <span className="ms-2 text-sm text-slate-600">Ingat Saya</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
                                >
                                    Lupa Password?
                                </Link>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Masuk</span>
                                    <LogIn className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Register */}
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm">
                            Belum punya akun?
                            <Link 
                                href={route('register')} 
                                className="ml-2 font-bold text-indigo-600 hover:text-indigo-800 transition-colors hover:underline"
                            >
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                    
                    {/* Demo Credentials Hint */}
                    <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 text-center animate-pulse-slow">
                        <p className="font-semibold mb-1">Demo Credentials:</p>
                        <p>Admin: <span className="font-mono text-indigo-600">admin@fintrack.com</span> / <span className="font-mono text-indigo-600">password</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { FormEventHandler, useEffect, ChangeEvent } from 'react'; // Tambah ChangeEvent
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, LogIn } from 'lucide-react'; 

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
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
    
    // Helper function untuk handle perubahan input
    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData(event.target.name as 'email' | 'password', event.target.value);
    };

    return (
        <GuestLayout>
            <Head title="Masuk ke FinTrack" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Selamat Datang</h2>
                <p className="text-slate-500 text-sm mt-1">Silakan masuk untuk mengelola keuangan</p>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600 bg-green-100 p-3 rounded-md">{status}</div>}

            <form onSubmit={submit} className="space-y-5">
                
                {/* --- EMAIL --- */}
                <div className="space-y-1">
                    <InputLabel htmlFor="email" value="Email" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="pl-10 block w-full border-slate-300 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                            autoComplete="username"
                            isFocused={true}
                            onChange={onHandleChange} // Pakai helper function
                            placeholder="nama@email.com"
                        />
                    </div>
                    <InputError message={errors.email} />
                </div>

                {/* --- PASSWORD --- */}
                <div className="space-y-1">
                    <InputLabel htmlFor="password" value="Password" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="pl-10 block w-full border-slate-300 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                            autoComplete="current-password"
                            onChange={onHandleChange} // Pakai helper function
                            placeholder="••••••••"
                        />
                    </div>
                    <InputError message={errors.password} />
                </div>

                {/* --- REMEMBER ME & FORGOT PASSWORD --- */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            // PERBAIKAN: Kita kasih tahu 'e' itu apa
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-slate-600 dark:text-slate-400">Ingat Saya</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline"
                        >
                            Lupa Password?
                        </Link>
                    )}
                </div>

                {/* --- TOMBOL SUBMIT --- */}
                <PrimaryButton className="w-full justify-center py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/30 transition-all" disabled={processing}>
                    <LogIn className="w-4 h-4 mr-2" />
                    {processing ? 'Sedang Masuk...' : 'Masuk Sekarang'}
                </PrimaryButton>

                {/* --- LINK DAFTAR --- */}
                <div className="text-center mt-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Belum punya akun?{' '}
                        <Link href={route('register')} className="font-bold text-indigo-600 hover:underline dark:text-indigo-400">
                            Daftar Gratis
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
// Import dari Laravel Breeze
import { useForm, Head } from '@inertiajs/react';
// Import Icon dari Desain Lama (Auth.tsx)
import { Mail, Lock, CheckCircle } from 'lucide-react'; 

export default function Login({ status }) {
    // --- INI MESINNYA (JANGAN DIHAPUS) ---
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };
    // -------------------------------------

    // --- INI TAMPILANNYA (HASIL COPY DARI AUTH.TSX) ---
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Head title="Log in" />
            
            {/* Form Wrapper - Pastikan ada onSubmit={submit} */}
            <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                
                {/* Judul dari Auth.tsx */}
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Selamat Datang Kembali</h2>

                {/* Input Email dengan Logic Baru */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input 
                            type="email" 
                            className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            value={data.email} // <--- SUDAH DIGANTI
                            onChange={(e) => setData('email', e.target.value)} // <--- SUDAH DIGANTI
                        />
                    </div>
                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                </div>

                {/* Input Password dengan Logic Baru */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input 
                            type="password" 
                            className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            value={data.password} // <--- SUDAH DIGANTI
                            onChange={(e) => setData('password', e.target.value)} // <--- SUDAH DIGANTI
                        />
                    </div>
                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                </div>

                <button type="submit" disabled={processing} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
                    {processing ? 'Memproses...' : 'Masuk Sekarang'}
                </button>
            </form>
        </div>
    );
}
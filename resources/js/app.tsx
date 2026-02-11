import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Cari SEMUA file (.jsx dan .tsx)
        const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}');
        
        // Prioritas: Cek .tsx dulu, kalau tidak ada baru .jsx
        const path = pages[`./Pages/${name}.tsx`] 
            ? `./Pages/${name}.tsx` 
            : `./Pages/${name}.jsx`;

        if (!path) throw new Error(`Halaman ${name} tidak ditemukan!`);
        return resolvePageComponent(path, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: { color: '#4B5563' },
});
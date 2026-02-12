import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // 1. Ambil daftar semua file yang tersedia
        const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}');
        
        // 2. Tentukan path potensial
        const tsxPath = `./Pages/${name}.tsx`;
        const jsxPath = `./Pages/${name}.jsx`;

        // 3. Cek path mana yang benar-benar ada di daftar 'pages'
        if (pages[tsxPath]) {
            return resolvePageComponent(tsxPath, pages);
        }
        
        if (pages[jsxPath]) {
            return resolvePageComponent(jsxPath, pages);
        }

        // 4. Jika tidak ada di keduanya, lempar error
        throw new Error(`Halaman "${name}" tidak ditemukan di folder Pages! Cek nama file.`);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: { color: '#4B5563' },
});
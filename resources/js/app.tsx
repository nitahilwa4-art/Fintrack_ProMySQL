import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // CARI DUA-DUANYA (.jsx dan .tsx)
        const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}');

        // Cek prioritas: Kalau ada .tsx pakai itu, kalau gak ada pakai .jsxnpm
        const path = pages[`./Pages/${name}.tsx`]
            ? `./Pages/${name}.tsx`
            : `./Pages/${name}.jsx`;

        return resolvePageComponent(path, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
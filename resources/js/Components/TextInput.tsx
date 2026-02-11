import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';

// PERBAIKAN: Kita jelaskan bahwa komponen ini menerima semua props <input> standar HTML
export default forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean }>(
    function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
        
        const localRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => localRef.current!);

        useEffect(() => {
            if (isFocused) {
                localRef.current?.focus();
            }
        }, [isFocused]);

        return (
            <input
                {...props}
                type={type}
                className={
                    'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                    className
                }
                ref={localRef}
            />
        );
    }
);
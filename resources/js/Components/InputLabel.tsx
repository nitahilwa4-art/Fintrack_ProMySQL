import { LabelHTMLAttributes, ReactNode } from 'react';

// PERBAIKAN: Tambahkan 'children?' (tanda tanya artinya opsional)
export default function InputLabel({ value, className = '', children, ...props }: LabelHTMLAttributes<HTMLLabelElement> & { value?: string, children?: ReactNode }) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-700 dark:text-gray-300 ` + className}>
            {value ? value : children}
        </label>
    );
}
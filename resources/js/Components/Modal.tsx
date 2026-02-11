import React from 'react';

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
  // isi modal kamu tetap, hanya signature props yang dirapikan
  return show ? <div>{children}</div> : null;
}

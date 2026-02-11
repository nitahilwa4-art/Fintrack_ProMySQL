import React from 'react';

type Props = {
  message?: string;
  className?: string;
};

export default function InputError({ message, className = '' }: Props) {
  if (!message) return null;

  return <p className={'text-sm text-red-600 ' + className}>{message}</p>;
}

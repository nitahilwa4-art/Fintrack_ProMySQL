import React, { createContext, useContext, useMemo, useState } from 'react';

type DropdownContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: () => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown components must be used within <Dropdown>');
  return ctx;
}

type DropdownProps = {
  children: React.ReactNode;
};

export default function Dropdown({ children }: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const value = useMemo<DropdownContextValue>(
    () => ({ open, setOpen, toggleOpen }),
    [open]
  );

  return (
    <DropdownContext.Provider value={value}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
}

type TriggerProps = {
  children: React.ReactNode;
};

Dropdown.Trigger = function DropdownTrigger({ children }: TriggerProps) {
  const { toggleOpen } = useDropdownContext();
  return (
    <div onClick={toggleOpen}>
      {children}
    </div>
  );
};

type ContentProps = {
  align?: 'left' | 'right';
  width?: '48' | '60';
  contentClasses?: string;
  children: React.ReactNode;
};

Dropdown.Content = function DropdownContent({
  align = 'right',
  width = '48',
  contentClasses = 'py-1 bg-white',
  children,
}: ContentProps) {
  const { open, setOpen } = useDropdownContext();

  const alignmentClasses = align === 'left' ? 'origin-top-left left-0' : 'origin-top-right right-0';
  const widthClasses = width === '60' ? 'w-60' : 'w-48';

  return (
    open ? (
      <>
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
        <div className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}>
          <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}>
            {children}
          </div>
        </div>
      </>
    ) : null
  );
};

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
};

Dropdown.Link = function DropdownLink({ className = '', children, ...props }: LinkProps) {
  return (
    <a
      {...props}
      className={
        `block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ${className}`
      }
    >
      {children}
    </a>
  );
};

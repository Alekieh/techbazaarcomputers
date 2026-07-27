import React from 'react';

export interface BadgeProps {
  variant?: 'new' | 'sale' | 'bestseller' | 'category';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = 'new',
  size = 'sm',
  children,
  className = ''
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-full uppercase font-semibold tracking-wider';
  
  const variants = {
    new: 'bg-blue-500/20 text-blue-400',
    sale: 'bg-red-500/20 text-red-400',
    bestseller: 'bg-gold/20 text-gold',
    category: 'bg-dark-500 text-dark-100'
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}

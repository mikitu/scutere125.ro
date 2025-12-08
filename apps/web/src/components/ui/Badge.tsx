'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
  className?: string;
  pulse?: boolean;
}

export function Badge({ children, variant = 'primary', className, pulse = false }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/20 text-primary border-primary/30',
    secondary: 'bg-secondary/20 text-blue-300 border-secondary/30',
    accent: 'bg-accent/20 text-accent border-accent/30',
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  return (
    <motion.span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border',
        variants[variant],
        pulse && 'animate-pulse',
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.span>
  );
}


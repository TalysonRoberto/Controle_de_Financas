'use client';

import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  message: string;
  className?: string;
}

export function EmptyState({ icon: Icon, message, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground ${className}`}>
      {Icon && <Icon size={40} className="stroke-[1.5] text-muted-foreground/40" />}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

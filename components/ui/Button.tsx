import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-lg shadow-emerald-950/20',
  secondary: 'bg-muted hover:bg-accent text-foreground border border-border',
  danger: 'bg-red-600 hover:bg-red-500 text-white',
  ghost: 'bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground',
};

const sizeClasses: Record<string, string> = {
  sm: 'h-7 px-2 text-[11px] rounded-lg',
  md: 'h-9 px-3 text-xs rounded-lg',
  lg: 'h-11 px-4 text-sm rounded-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2 font-semibold
          transition-all duration-200 active:scale-[0.98]
          disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

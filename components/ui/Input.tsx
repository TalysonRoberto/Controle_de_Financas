import { InputHTMLAttributes, forwardRef, useState } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, onFocus, onBlur, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const [focused, setFocused] = useState(false);

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-xs sm:text-sm font-semibold text-muted-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full h-10 sm:h-11 px-3 rounded-lg sm:rounded-xl
            bg-muted/50 text-foreground border text-sm
            placeholder-muted-foreground
            outline-none transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${focused ? 'border-emerald-500/50 shadow-[0_0_0_3px_rgba(16,185,129,0.1)]' : ''}
            ${error ? 'border-red-500' : 'border-border hover:border-muted-foreground/30'}
            ${className}
          `}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

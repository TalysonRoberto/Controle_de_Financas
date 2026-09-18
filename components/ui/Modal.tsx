'use client';

import { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-[650px]',
  showCloseButton = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4 py-6 overflow-y-auto animate-fadeIn"
    >
      <div
        ref={contentRef}
        className={`
          relative w-full ${maxWidth} my-auto
          bg-card/95 backdrop-blur-xl
          border border-border
          rounded-xl sm:rounded-2xl
          p-4 sm:p-6
          shadow-2xl
          text-foreground
          max-h-[85vh] overflow-y-auto
          custom-scrollbar
          animate-fadeInScale
        `}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="
              absolute top-3 right-3 sm:top-4 sm:right-4
              w-8 h-8 sm:w-9 sm:h-9
              rounded-lg sm:rounded-xl
              bg-muted hover:bg-red-500/20
              text-muted-foreground hover:text-red-400
              flex items-center justify-center
              transition-all duration-200
              z-10
            "
          >
            <X size={14} />
          </button>
        )}

        {title && (
          <div className="mb-4 sm:mb-6 pr-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight capitalize text-foreground">
              {title}
            </h2>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

import { useEffect } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-white animate-fade-in">
      {/* Close button - top right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-600 hover:text-gray-900 transition-colors font-bold text-lg"
      >
        ✕ Back to puzzle
      </button>

      {/* Centered content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center animate-scale-in flex flex-col items-center">{children}</div>
      </div>
    </div>
  )
}

import { useEffect } from 'react'

export interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number // milliseconds, default 2000
}

export function Toast({
  message,
  isVisible,
  onClose,
  duration = 2000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black text-white px-4 py-1 rounded-md">{message}</div>
    </div>
  )
}

export interface ControlButtonProps {
  children: React.ReactNode
  onClick: () => void
  highlighted?: boolean
  disabled?: boolean
}

export function ControlButton({
  onClick,
  children,
  highlighted = false,
  disabled = false,
}: ControlButtonProps) {
  const style = highlighted ? 'text-white bg-black' : ''
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 border rounded-4xl cursor-pointer font-semibold ${style}`}
    >
      {children}
    </button>
  )
}

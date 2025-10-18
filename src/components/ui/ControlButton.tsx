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
  const style = highlighted
    ? 'text-white bg-black border-black'
    : 'border-black'
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 border rounded-4xl text-lg cursor-pointer font-semibold ${style} disabled:cursor-default`}
    >
      {children}
    </button>
  )
}

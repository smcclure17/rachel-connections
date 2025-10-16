export interface TileButtonProps {
  children: React.ReactNode
  selected: boolean
  disabled: boolean
  animateIncorrect: boolean
  animateSelecting: boolean
  animationDelay: number
  onClick: () => void
}

export function TileButton({
  children,
  selected,
  disabled,
  animateIncorrect,
  animateSelecting,
  animationDelay,
  onClick,
}: TileButtonProps) {
  const delayMs = animationDelay * 100 // 100ms delay between each tile

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={animateSelecting ? { animationDelay: `${delayMs}ms` } : undefined}
      className={`border border-transparent aspect-square md:aspect-auto md:h-20 rounded-lg transition-colors cursor-pointer font-bold flex items-center justify-center ${
        selected ? 'bg-[#5a594e] text-white' : 'bg-[#efefe6]'
      } ${animateIncorrect ? 'animate-shake opacity-80' : ''} ${animateSelecting ? 'animate-bounce-once' : ''}`}
    >
      {children}
    </button>
  )
}

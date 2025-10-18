import { forwardRef, useState } from 'react'

export interface TileButtonProps {
  children: React.ReactNode
  selected: boolean
  disabled: boolean
  animateIncorrect: boolean
  animateSelecting: boolean
  animationDelay: number
  onClick: () => void
}

export const TileButton = forwardRef<HTMLButtonElement, TileButtonProps>(
  (
    {
      children,
      selected,
      disabled,
      animateIncorrect,
      animateSelecting,
      animationDelay,
      onClick,
    },
    ref,
  ) => {
    const [isPressed, setIsPressed] = useState(false)
    const delayMs = animationDelay * 100 // 100ms delay between each tile

    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        style={
          animateSelecting ? { animationDelay: `${delayMs}ms` } : undefined
        }
        className={`border border-transparent aspect-square md:aspect-auto md:h-20 rounded-lg transition-all cursor-pointer font-extrabold flex items-center justify-center ${
          selected ? 'bg-[#5a594e] text-white' : 'bg-[#efefe6]'
        } ${animateIncorrect ? 'animate-shake opacity-80' : ''} ${animateSelecting ? 'animate-bounce-once' : ''} ${isPressed ? 'scale-90' : 'scale-100'}`}
      >
        {children}
      </button>
    )
  },
)

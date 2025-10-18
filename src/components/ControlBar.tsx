
interface ControlBarProps {
  children: React.ReactNode
}

export function ControlBar({ children }: ControlBarProps) {
  return (
    <div className="flex flex-row space-x-2 py-8 justify-center">
      {children}
    </div>
  )
}

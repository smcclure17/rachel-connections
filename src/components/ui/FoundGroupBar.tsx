interface FoundGroupBarProps {
  color: string
  title: string
  words: string[]
}

export function FoundGroupBar({ title, color, words }: FoundGroupBarProps) {
  return (
    <div className={`px-4 h-20 rounded bg-${color} flex flex-col items-center justify-center`}>
      <p className="font-bold">{title}</p>
      <p className="text-sm">{words.join(', ')}</p>
    </div>
  )
}

interface FoundGroupBarProps {
  color: string
  title: string
  words: string[]
}

export function FoundGroupBar({ title, color, words }: FoundGroupBarProps) {
  return (
    <div className={`px-4 py-5 rounded bg-${color}`}>
      <p className="font-bold">{title}</p>
      <p className="">{words.join(', ')}</p>
    </div>
  )
}

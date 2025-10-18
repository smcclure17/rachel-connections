interface FoundGroupBarProps {
  color: string
  title: string
  words: string[]
}

export function FoundGroupBar({ title, color, words }: FoundGroupBarProps) {
  const colorVariants: any = {
    yellow: 'bg-yellow-200',
    red: 'bg-red-400',
    green: 'bg-green-200',
    blue: 'bg-blue-200',
  }

  return (
    <div
      className={`px-4 h-24 md:h-20 rounded ${colorVariants[color]} flex flex-col items-center justify-center animate-pop`}
    >
      <p className="font-bold">{title}</p>
      <p className="text-sm">{words.join(', ')}</p>
    </div>
  )
}

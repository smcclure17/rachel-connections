import { ConnectionsGame } from '@/components/ConnectionsGame'
import { GameState } from '@/types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/')({
  ssr: false,
  component: IndexPage,
})

const initialState: GameState = {
  groups: [
    {
      tiles: [
        { word: 'hello', selected: false },
        { word: 'cat', selected: false },
        { word: 'meow', selected: false },
        { word: 'rawr', selected: false },
      ],
      found: false,
      color: 'blue-200',
      title: 'cats',
    },
    {
      tiles: [
        { word: 'bark', selected: false },
        { word: 'grrr', selected: false },
        { word: 'wag', selected: false },
        { word: 'bite!', selected: false },
      ],
      found: false,
      color: 'yellow-200',
      title: 'dogs',
    },
    {
      tiles: [
        { word: 'hssss', selected: false },
        { word: 'wiggle', selected: false },
        { word: 'venom!', selected: false },
        { word: 'slither', selected: false },
      ],
      found: false,
      color: 'gray-200',
      title: 'snakes',
    },
  ],
  foundGroups: [],
}

function IndexPage() {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <ConnectionsGame initialState={initialState} />
    </div>
  )
}

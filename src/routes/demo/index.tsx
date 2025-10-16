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
        { word: 'MFA', selected: false },
        { word: 'Wusong', selected: false },
        { word: 'Clay', selected: false },
        { word: 'stalking', selected: false },
      ],
      found: false,
      color: 'yellow-200',
      title: 'iconic dates',
    },
    {
      tiles: [
        { word: 'kitchen', selected: false },
        { word: 'stairs', selected: false },
        { word: 'couch', selected: false },
        { word: 'almost park', selected: false },
      ],
      found: false,
      color: 'gray-200',
      title: 'places we have banged',
    },
    {
      tiles: [
        { word: 'I', selected: false },
        { word: 'Love', selected: false },
        { word: 'You', selected: false },
        { word: 'Rachel', selected: false },
      ],
      found: false,
      color: 'red-400',
      title: 'how i feel about you',
    },
  ],
  foundGroups: [],
}

function IndexPage() {
  return (
    <div className="max-w-5xl mx-auto mt-24">
      <ConnectionsGame initialState={initialState} />
    </div>
  )
}

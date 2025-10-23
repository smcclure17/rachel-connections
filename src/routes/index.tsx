import { ConnectionsGame } from '@/components/ConnectionsGame'
import { GameState } from '@/types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  ssr: false,
  component: IndexPage
})

const initialState: GameState = {
  groups: [
    {
      tiles: [
        { word: 'minecraft', selected: false },
        { word: 'sewing', selected: false },
        { word: 'baking', selected: false },
        { word: 'gherkins', selected: false },
      ],
      found: false,
      color: 'blue',
      title: "rachel's fixation eras",
    },
    {
      tiles: [
        { word: 'MFA', selected: false },
        { word: 'Wusong road', selected: false },
        { word: 'Claydate', selected: false },
        { word: 'stalking', selected: false },
      ],
      found: false,
      color: 'yellow',
      title: 'our iconic dates',
    },
    {
      tiles: [
        { word: 'hotel', selected: false },
        { word: 'stairs', selected: false },
        { word: 'couch', selected: false },
        { word: 'almost park', selected: false },
      ],
      found: false,
      color: 'green',
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
      color: 'red',
      title: 'how i feel about you',
    },
  ],
  foundGroups: [],
}

function IndexPage() {
  return (
    <div className="max-w-5xl mx-auto mt-24">
      <h1 className="text-center flex flex-col">
        <span className='text-sm text-black italic'>one year of</span>
        <span className='text-connections text-3xl text-black'>Connection(s)</span>
        <span>October 23, 2025</span>
      </h1>
      <ConnectionsGame initialState={initialState} />
    </div>
  )
}

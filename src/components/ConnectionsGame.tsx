import { useConnectionsGame } from '@/hooks'
import { GameState } from '@/types'
import { TileButton } from './ui/TileButton'
import { ControlButton } from './ui/ControlButton'
import { FoundGroupBar } from './ui/FoundGroupBar'

export interface ConnectionsGameProps {
  initialState: GameState
}

export function ConnectionsGame({ initialState }: ConnectionsGameProps) {
  const {
    state,
    allWords,
    numSelectedTiles,
    selectedIndices,
    incorrectGuess,
    isSelecting,
    pendingFoundGroup,
    handleSubmit,
    handleToggleTile,
    handleClearSelection,
  } = useConnectionsGame(initialState)

  // When rearranging, sort so selected tiles come first
  const displayWords = pendingFoundGroup
    ? [
        ...allWords.filter((tile) => tile.selected),
        ...allWords.filter((tile) => !tile.selected),
      ]
    : allWords

  return (
    <div className="space-y-2 p-4 md:p-8 lg:p-12 max-w-2xl mx-auto">
      {state.foundGroups.length > 0 && (
        <div className="grid gap-2 grid-cols-1 text-center">
          {state.foundGroups.map((group) => (
            <FoundGroupBar
              key={group.title}
              title={group.title}
              color={group.color}
              words={group.tiles.map((tile) => tile.word.toUpperCase())}
            />
          ))}
        </div>
      )}
      <div className="grid gap-2 grid-cols-4">
        {displayWords.map((tile, index) => {
          return (
            <TileButton
              selected={tile.selected}
              key={tile.word}
              data-tile={tile.word}
              disabled={!tile.selected && numSelectedTiles >= 4}
              animateIncorrect={tile.selected && incorrectGuess}
              animateSelecting={tile.selected && isSelecting}
              animationDelay={selectedIndices.indexOf(index)}
              onClick={() => handleToggleTile(tile.word)}
            >
              {tile.word.toUpperCase()}
            </TileButton>
          )
        })}
      </div>
      <div className="flex flex-row space-x-2 py-4 justify-center">
        <ControlButton onClick={handleClearSelection}>
          Deselect All
        </ControlButton>
        <ControlButton
          onClick={handleSubmit}
          highlighted={numSelectedTiles === 4}
        >
          Submit
        </ControlButton>
      </div>
    </div>
  )
}

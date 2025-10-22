import { useConnectionsGame, useFlipAnimation } from '@/hooks'
import { GameState } from '@/types'
import { TileButton } from './ui/TileButton'
import { ControlButton } from './ui/ControlButton'
import { FoundGroupBar } from './ui/FoundGroupBar'
import { Modal } from './ui/Modal'
import { Toast } from './ui/Toast'
import { useEffect, useState } from 'react'
import { wait } from '@/utils'
import { Image } from '@unpic/react'
import { ControlBar } from './ControlBar'

export interface ConnectionsGameProps {
  initialState: GameState
}

export function ConnectionsGame({ initialState }: ConnectionsGameProps) {
  const {
    state,
    allWords,
    numSelectedTiles,
    incorrectGuess,
    isSelecting,
    pendingFoundGroup,
    gameWon,
    toastMessage,
    setToastMessage,
    handleSubmit,
    handleToggleTile,
    handleClearSelection,
  } = useConnectionsGame(initialState)

  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    wait(1000).then(() => setShowModal(gameWon))
  }, [gameWon])

  // When rearranging, sort so selected tiles come first
  const displayWords = pendingFoundGroup
    ? [
        ...allWords.filter((tile) => tile.selected),
        ...allWords.filter((tile) => !tile.selected),
      ]
    : allWords

  // Calculate animation delay based on position in displayWords
  const selectedIndices = displayWords
    .map((tile, index) => (tile.selected ? index : -1))
    .filter((index) => index !== -1)

  const tileRefs = useFlipAnimation(
    displayWords.map((tile) => tile.word),
    !!pendingFoundGroup,
  )

  return (
    <div className="space-y-2 p-4 md:p-8 lg:p-12 max-w-2xl mx-auto">
      {state.foundGroups.length > 0 && (
        <div className="grid gap-2 grid-cols-1 text-center">
          {state.foundGroups.map((group) => (
            <FoundGroupBar
              key={group.title}
              title={group.title.toUpperCase()}
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
              ref={(el) => {
                tileRefs.current[tile.word] = el
              }}
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
      <ControlBar>
        {gameWon && (
          <ControlButton onClick={() => setShowModal(!showModal)}>
            See Results
          </ControlButton>
        )}
        {!gameWon && (
          <ControlButton onClick={handleClearSelection}>
            Deselect All
          </ControlButton>
        )}
        {!gameWon && (
          <ControlButton
            onClick={handleSubmit}
            highlighted={numSelectedTiles === 4}
            disabled={numSelectedTiles !== 4}
          >
            Submit
          </ControlButton>
        )}
      </ControlBar>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-2xl font-bold text-red-900">Rachel {"<3"}</h2>
        <Image src="/rach.png" alt="rach" height={500} width={200} />
        <p className="max-w-2xl">
          One year ago we set out to watch a (not-) rom-com; what a year it has been since :)
        </p>
        <p>
          At the time, I had no idea the woman i was letting into my life.
        </p>
        <p>
          It has been such a whirlwind of fun, excitement, and growth
        </p>
        <p>Whether it's playing Minecraft, raving, watching HIMYM, or going on ridiculously long walks (our Strava's are goated)</p>
        <button className="pt-10" onClick={() => setShowModal(false)}>Close</button>
      </Modal>
      <Toast
        message={toastMessage}
        isVisible={toastMessage !== ''}
        onClose={() => setToastMessage('')}
      />
    </div>
  )
}

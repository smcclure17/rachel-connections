import { useConnectionsGame } from '@/hooks'
import { GameState } from '@/types'
import { TileButton } from './ui/TileButton'
import { ControlButton } from './ui/ControlButton'
import { FoundGroupBar } from './ui/FoundGroupBar'
import { Modal } from './ui/Modal'
import { Toast } from './ui/Toast'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

  const tileRefs = useRef<Record<string, HTMLButtonElement | null>>({})

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

  const previousPositions = useRef<Record<string, DOMRect>>({})

  useEffect(() => {
    if (pendingFoundGroup) return // Don't update positions during animation

    Object.keys(tileRefs.current).forEach((word) => {
      const el = tileRefs.current[word]
      if (el) {
        previousPositions.current[word] = el.getBoundingClientRect()
      }
    })
  }, [pendingFoundGroup, displayWords])

  useLayoutEffect(() => {
    if (!pendingFoundGroup) return

    const first = previousPositions.current

    // No need for requestAnimationFrame here - we're already in the right timing
    displayWords.forEach((tile) => {
      const el = tileRefs.current[tile.word]
      if (el && first[tile.word]) {
        const last = el.getBoundingClientRect()
        const deltaX = first[tile.word].left - last.left
        const deltaY = first[tile.word].top - last.top

        // INVERT - apply immediately
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`
        el.style.transition = 'none'
      }
    })

    // PLAY - use RAF for the animation
    requestAnimationFrame(() => {
      displayWords.forEach((tile) => {
        const el = tileRefs.current[tile.word]
        if (el) {
          el.style.transform = ''
          el.style.transition = 'transform 0.4s ease-out'
        }
      })
    })
  }, [pendingFoundGroup])

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
        <h2 className="text-2xl font-bold mb-4">Congrats!</h2>
        <Image src="/rach.png" alt="rach" height={500} width={200} />
        <p className="max-w-2xl">
          Rachel, the past year with you hgitas been lorem ipsumhas been lorem
          ipsum has been lorem ipsum has been lorem ipsum has been lorem
          ipsum{' '}
        </p>
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal>
      <Toast
        message={toastMessage}
        isVisible={toastMessage !== ''}
        onClose={() => setToastMessage('')}
      />
    </div>
  )
}

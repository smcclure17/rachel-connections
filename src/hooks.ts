import { useReducer, useState, useMemo, useLayoutEffect, useRef } from 'react'
import { gameReducer } from '@/reducer'
import { GameState, Group, WordTile } from '@/types'
import { shuffle, wait } from './utils'

export function useConnectionsGame(initialState: GameState) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [incorrectGuess, setIncorrectGuess] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [pendingFoundGroup, setPendingFoundGroup] = useState<Group | null>(null)
  const [toastMessage, setToastMessage] = useState('')

  // Shuffle all tiles once for display, but keep original state for game logic
  const shuffledTiles = useMemo(() => {
    const allTiles = initialState.groups.flatMap((group) => group.tiles)
    return shuffle(allTiles)
  }, [])

  // Map shuffled tiles to current state (so selections update)
  const allWords = useMemo<WordTile[]>(() => {
    const currentTiles = state.groups.flatMap((group) => group.tiles)
    const tileMap = new Map(currentTiles.map((tile) => [tile.word, tile]))
    return shuffledTiles
      .map((tile) => tileMap.get(tile.word))
      .filter((tile): tile is WordTile => tile !== undefined)
  }, [state.groups, shuffledTiles])

  const numSelectedTiles = allWords.filter((tile) => tile.selected).length

  const gameWon = allWords.length === 0

  const handleSubmit = async () => {
    const selectedGroup = state.groups.find((group) =>
      group.tiles.every((tile) => tile.selected),
    )

    setIsSelecting(true)
    await wait(1000)
    setIsSelecting(false)

    if (!selectedGroup) {
      // Check if "one away" (3 tiles from same group selected)
      const oneAway = state.groups.some(
        (group) => group.tiles.filter((tile) => tile.selected).length === 3,
      )

      if (oneAway) {
        setToastMessage('One away...')
      }

      setIncorrectGuess(true)
      await wait(1000)
      setIncorrectGuess(false)
      dispatch({ type: 'SUBMIT' })
    } else {
      // Correct answer
      await wait(200)

      // Trigger rearrangement animation
      setPendingFoundGroup(selectedGroup)
      await wait(500)

      dispatch({ type: 'SUBMIT' })
      setPendingFoundGroup(null)
    }
  }

  const handleToggleTile = (word: string) => {
    dispatch({ type: 'TOGGLE_TILE', word })
  }

  const handleClearSelection = () => {
    dispatch({ type: 'CLEAR_SELECTION' })
  }

  return {
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
  }
}

export function useFlipAnimation<T extends string>(
  items: T[],
  trigger: boolean,
) {
  const refs = useRef<Record<T, HTMLElement | null>>(
    {} as Record<T, HTMLElement | null>,
  )
  const previousPositions = useRef<Record<T, DOMRect>>({} as Record<T, DOMRect>)

  // Capture positions when NOT animating
  useLayoutEffect(() => {
    if (trigger) return

    Object.keys(refs.current).forEach((key) => {
      const el = refs.current[key as T]
      if (el) {
        previousPositions.current[key as T] = el.getBoundingClientRect()
      }
    })
  })

  // Run FLIP animation when triggered
  useLayoutEffect(() => {
    if (!trigger) return

    const first = previousPositions.current

    items.forEach((item) => {
      const el = refs.current[item]
      if (el && first[item]) {
        const last = el.getBoundingClientRect()
        const deltaX = first[item].left - last.left
        const deltaY = first[item].top - last.top

        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`
        el.style.transition = 'none'
      }
    })

    requestAnimationFrame(() => {
      items.forEach((item) => {
        const el = refs.current[item]
        if (el) {
          el.style.transform = ''
          el.style.transition = 'transform 0.4s ease-out'
        }
      })
    })
  }, [trigger, items])

  return refs
}

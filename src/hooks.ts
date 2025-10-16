import { useReducer, useState, useMemo } from 'react'
import { gameReducer } from '@/reducer'
import { GameState, Group, WordTile } from '@/types'
import { shuffle, wait } from './utils'

export function useConnectionsGame(initialState: GameState) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [incorrectGuess, setIncorrectGuess] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [pendingFoundGroup, setPendingFoundGroup] = useState<Group | null>(null)

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

  const handleSubmit = async () => {
    const selectedGroup = state.groups.find((group) =>
      group.tiles.every((tile) => tile.selected),
    )

    setIsSelecting(true)
    await wait(1000)
    setIsSelecting(false)

    if (!selectedGroup) {
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
    handleSubmit,
    handleToggleTile,
    handleClearSelection,
  }
}

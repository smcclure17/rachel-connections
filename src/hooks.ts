import { useReducer, useState } from 'react'
import { gameReducer } from '@/reducer'
import { GameState, Group } from '@/types'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function useConnectionsGame(initialState: GameState) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [incorrectGuess, setIncorrectGuess] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [pendingFoundGroup, setPendingFoundGroup] = useState<Group | null>(null)

  const allWords = state.groups.flatMap((group) => group.tiles)
  const numSelectedTiles = allWords.filter((tile) => tile.selected).length

  const selectedIndices = allWords
    .map((tile, index) => (tile.selected ? index : -1))
    .filter((index) => index !== -1)

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
    selectedIndices,
    incorrectGuess,
    isSelecting,
    pendingFoundGroup,
    handleSubmit,
    handleToggleTile,
    handleClearSelection,
  }
}

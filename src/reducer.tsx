import { GameState, GameAction } from './types'

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'TOGGLE_TILE':
      return {
        ...state,
        groups: state.groups.map((group) => ({
          ...group,
          tiles: group.tiles.map((tile) =>
            tile.word === action.word
              ? { ...tile, selected: !tile.selected }
              : tile,
          ),
        })),
      }
    case 'CLEAR_SELECTION':
      return {
        ...state,
        groups: state.groups.map((group) => ({
          ...group,
          tiles: group.tiles.map((tile) => ({ ...tile, selected: false })),
        })),
      }
    case 'SUBMIT':
      const selectedGroup = state.groups.find((group) =>
        group.tiles.every((tile) => tile.selected),
      )

      if (!selectedGroup) return state
      return {
        ...state,
        groups: state.groups.filter((g) => g.title !== selectedGroup.title),
        foundGroups: [...state.foundGroups, selectedGroup],
      }
    default:
      return state
  }
}

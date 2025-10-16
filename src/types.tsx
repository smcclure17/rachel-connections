export interface WordTile {
  word: string
  selected: boolean
}

export interface Group {
  tiles: WordTile[]
  found: boolean
  color: string
  title: string
}

export interface GameState {
  groups: Group[]
}

export type GameAction =
  | { type: 'TOGGLE_TILE'; word: string }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SUBMIT' }

export interface GameState {
  groups: Group[]
  foundGroups: Group[]
}

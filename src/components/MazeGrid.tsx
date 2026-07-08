import type { mazeCell, mazeState } from '../maze/mazeTypes'

type MazeGridProps = {
  grid: mazeCell[][]
  mazeState: mazeState
}

export function MazeGrid({ grid, mazeState }: MazeGridProps) {
  return (
    <div className="maze-grid" aria-label="Maze layout">
      {grid.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          const isPlayerHere =
            mazeState.position.row === rowIndex &&
            mazeState.position.col === columnIndex

          return (
            <div
              className={`maze-cell ${getCellClass(cell)} ${
                isPlayerHere ? 'player-cell' : ''
              }`}
              key={`${rowIndex}-${columnIndex}`}
            >
              {isPlayerHere ? getPlayerIcon(mazeState.direction) : getCellLabel(cell)}
            </div>
          )
        }),
      )}
    </div>
  )
}

function getCellClass(cell: mazeCell) {
  if (cell === 'wall') return 'wall-cell'
  if (cell === 'start') return 'start-cell'
  if (cell === 'goal') return 'goal-cell'
  return 'path-cell'
}

function getCellLabel(cell: mazeCell) {
  if (cell === 'goal') return '★'
  return ''
}

function getPlayerIcon(direction: mazeState['direction']) {
  if (direction === 'up') return '▲'
  if (direction === 'right') return '▶'
  if (direction === 'down') return '▼'
  return '◀'
}

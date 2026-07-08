import type { mazeCell } from '../maze/mazeTypes'
import { createInitialMazeState, validateMaze } from '../maze/mazeEngine'
import { sampleMazes } from '../maze/sampleMazes'

const activeLevel = sampleMazes[1]
const activeMazeState = createInitialMazeState(activeLevel)
const validationErrors = validateMaze(activeLevel)

export function MazeView() {
  return (
    <section className="panel maze-panel">
      <div className="panel-header">
        <p className="panel-label">Step 2</p>
        <h2>Maze Challenge</h2>
      </div>

      <div className="level-summary">
        <h3>{activeLevel.name}</h3>
        <p>
          <strong>Concept:</strong> {activeLevel.concept}
        </p>
        <p>{activeLevel.instructions}</p>
      </div>

      {validationErrors.length > 0 ? (
        <div className="maze-error-box">
          <strong>Maze setup error:</strong>
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="maze-grid" aria-label="Static preview of maze layout">
          {activeLevel.grid.map((row: mazeCell[], rowIndex:number) =>
            row.map((cell, columnIndex) => (
              <div
                className={`maze-cell ${getCellClass(cell)}`}
                key={`${rowIndex}-${columnIndex}`}
              >
                {getCellLabel(cell, rowIndex, columnIndex)}
              </div>
            )),
          )}
        </div>
      )}

      <div className="maze-state-preview">
        <p>
          <strong>Player start:</strong> row{' '}
          {activeMazeState.position.row}, column{' '}
          {activeMazeState.position.col}
        </p>
        <p>
          <strong>Goal:</strong> row {activeMazeState.goal.row}, column{' '}
          {activeMazeState.goal.col}
        </p>
        <p>
          <strong>Starting direction:</strong> {activeMazeState.direction}
        </p>
      </div>

      <div className="maze-controls">
        <button type="button">Run</button>
        <button type="button">Reset</button>
      </div>

      <p className="panel-note">
        This area now uses a typed maze data model. Movement logic will be added
        later.
      </p>
    </section>
  )
}

function getCellClass(cell: mazeCell) {
  if (cell === 'wall') return 'wall-cell'
  if (cell === 'start') return 'start-cell'
  if (cell === 'goal') return 'goal-cell'
  return 'path-cell'
}

function getCellLabel(cell: mazeCell, row: number, column: number) {
  if (
    row === activeMazeState.position.row &&
    column === activeMazeState.position.col
  ) {
    return '▶'
  }

  if (cell === 'goal') return '★'

  return ''
}

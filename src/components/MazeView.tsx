const previewMaze = [
  ['S', '.', '.', '#', '.'],
  ['#', '#', '.', '#', '.'],
  ['.', '.', '.', '.', '.'],
  ['.', '#', '#', '#', '.'],
  ['.', '.', '.', '.', 'G'],
]

export function MazeView() {
  return (
    <section className="panel maze-panel">
      <div className="panel-header">
        <p className="panel-label">Step 2</p>
        <h2>Maze Challenge</h2>
      </div>

      <div className="maze-grid" aria-label="Static preview of maze layout">
        {previewMaze.map((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <div
              className={`maze-cell ${getCellClass(cell)}`}
              key={`${rowIndex}-${columnIndex}`}
            >
              {getCellLabel(cell)}
            </div>
          )),
        )}
      </div>

      <div className="maze-controls">
        <button type="button">Run</button>
        <button type="button">Reset</button>
      </div>

      <p className="panel-note">
        This area will later show the character moving through maze challenges
        based on the learner&apos;s program.
      </p>
    </section>
  )
}

function getCellClass(cell: string) {
  if (cell === '#') return 'wall-cell'
  if (cell === 'S') return 'start-cell'
  if (cell === 'G') return 'goal-cell'
  return 'path-cell'
}

function getCellLabel(cell: string) {
  if (cell === 'S') return '▶'
  if (cell === 'G') return '★'
  if (cell === '#') return ''
  return ''
}

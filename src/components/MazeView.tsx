import { createInitialMazeState, validateMaze } from '../maze/mazeEngine'
import { sampleMazes } from '../maze/sampleMazes'
import { LevelSummary } from './LevelSummary'
import { MazeControls } from './MazeControls'
import { MazeGrid } from './MazeGrid'
import { MazeStatePreview } from './MazeStatePreview'
import { MazeValidationErrors } from './MazeValidationErrors'

const activeLevel = sampleMazes[1]!
const activeMazeState = createInitialMazeState(activeLevel)
const validationErrors = validateMaze(activeLevel)

export function MazeView() {
  return (
    <section className="panel maze-panel">
      <div className="panel-header">
        <p className="panel-label">Step 2</p>
        <h2>Maze Challenge</h2>
      </div>

      <LevelSummary level={activeLevel} />

      <MazeValidationErrors errors={validationErrors} />

      {validationErrors.length === 0 && (
        <MazeGrid grid={activeLevel.grid} mazeState={activeMazeState} />
      )}

      <MazeStatePreview mazeState={activeMazeState} />

      <MazeControls />
    </section>
  )
}


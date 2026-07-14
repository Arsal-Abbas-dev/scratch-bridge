import { createInitialMazeState, validateMaze, runCommand } from '../maze/mazeEngine'
import { sampleMazes } from '../maze/sampleMazes'
import { LevelSummary } from './LevelSummary'
import { MazeControls } from './MazeControls'
import { MazeGrid } from './MazeGrid'
import { MazeStatePreview } from './MazeStatePreview'
import { MazeValidationErrors } from './MazeValidationErrors'

import { useState } from 'react'
import type { moveCommand } from '../maze/mazeTypes'

const activeLevel = sampleMazes[3]!
const validationErrors = validateMaze(activeLevel)

export function MazeView() {
  const [mazeState, setMazeState] = useState(() =>
    createInitialMazeState(activeLevel),
  )

  function handleCommand(commandType: moveCommand) {
    setMazeState((currentState) =>
      runCommand(activeLevel, currentState, commandType),
    )
  }

  function handleReset() {
    setMazeState(createInitialMazeState(activeLevel))
  }

  return (
    <section className="panel maze-panel">
      <div className="panel-header">
        <p className="panel-label">Step 2</p>
        <h2>Maze Challenge</h2>
      </div>

      <LevelSummary level={activeLevel} />

      <MazeValidationErrors errors={validationErrors} />

      {validationErrors.length === 0 && (
        <MazeGrid grid={activeLevel.grid} mazeState={mazeState} />
      )}

      <MazeStatePreview mazeState={mazeState} />

      <MazeControls
        onCommand={handleCommand}
        onReset={handleReset}
        isComplete={mazeState.isComplete}
        hasErrors={validationErrors.length > 0}
      />

      <p className="panel-note">
        The movement buttons update the maze state.
      </p>
    </section>
  )
}



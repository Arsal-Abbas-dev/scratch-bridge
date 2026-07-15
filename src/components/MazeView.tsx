import { useState } from 'react'
import type { moveCommand, mazeState } from '../maze/mazeTypes'
import { createInitialMazeState, runCommand, validateMaze } from '../maze/mazeEngine'
import { sampleMazes } from '../maze/sampleMazes'
import { LevelSummary } from './LevelSummary'
import { MazeControls } from './MazeControls'
import { MazeGrid } from './MazeGrid'
import { MazeStatePreview } from './MazeStatePreview'
import { MazeValidationErrors } from './MazeValidationErrors'
import { CodeView } from './CodeView'
import { CommandBuilder } from './CommandBuilder'

const activeLevel = sampleMazes[3]!
const validationErrors = validateMaze(activeLevel)

export function MazeView() {
  const [mazeState, setMazeState] = useState(() =>
    createInitialMazeState(activeLevel),
  )

  const [programCommands, setProgramCommands] = useState<moveCommand[]>([])

  function handleCommand(commandType: moveCommand) {
    setMazeState((currentState) =>
      runCommand(activeLevel, currentState, commandType),
    )
  }

  function handleReset() {
    setMazeState(createInitialMazeState(activeLevel))
  }

  function handleAddProgramCommand(commandType: moveCommand) {
    setProgramCommands((currentCommands) => [...currentCommands, commandType])
  }

  function handleClearProgram() {
    setProgramCommands([])
  }

  function handleRunProgram() {
    setMazeState((currentState) =>
      runProgramCommands(currentState, programCommands),
    )
  }

  function runProgramCommands(
    startingState: mazeState,
    commands: moveCommand[],
  ) {
    let nextState = startingState

    for (const commandType of commands) {
      if (nextState.isComplete) {
        break
      }

      nextState = runCommand(activeLevel, nextState, commandType)
    }

    return nextState
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

      <CommandBuilder
        programCommands={programCommands}
        onAddCommand={handleAddProgramCommand}
        onClearProgram={handleClearProgram}
        onRunProgram={handleRunProgram}
        isRunDisabled={
          programCommands.length === 0 ||
          validationErrors.length > 0 ||
          mazeState.isComplete
        }
        isClearDisabled={programCommands.length === 0}
      />

      <CodeView commands={programCommands} isEmbedded />

      <MazeControls
        onCommand={handleCommand}
        onReset={handleReset}
        isComplete={mazeState.isComplete}
        hasErrors={validationErrors.length > 0}
      />

      <p className="panel-note">
        The command builder creates a planned program before it runs.
      </p>
    </section>
  )
}


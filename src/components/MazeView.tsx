import { useState } from 'react'
import type { moveCommand, mazeState } from '../maze/mazeTypes'
import {
  createInitialMazeState,
  runCommand,
  validateMaze,
} from '../maze/mazeEngine'
import { sampleMazes } from '../maze/sampleMazes'
import { CodeView } from './CodeView'
import { CommandBuilder } from './CommandBuilder'
import { LevelSummary } from './LevelSummary'
import { MazeControls } from './MazeControls'
import { MazeGrid } from './MazeGrid'
import { MazeStatePreview } from './MazeStatePreview'
import { MazeValidationErrors } from './MazeValidationErrors'
import {
  ProgramRunSummary,
  type ProgramRunResult,
} from './ProgramRunSummary'

const activeLevel = sampleMazes[0]!
const validationErrors = validateMaze(activeLevel)

function getMazeStateStatus(mazeState: mazeState) {
  return String(mazeState.status)
}

function getMazeStateMessage(mazeState: mazeState) {
  return String(mazeState.message)
}

export function MazeView() {
  const [mazeState, setMazeState] = useState(() =>
    createInitialMazeState(activeLevel),
  )

  const [programCommands, setProgramCommands] = useState<moveCommand[]>([])
  const [programRunResult, setProgramRunResult] =
    useState<ProgramRunResult | null>(null)

  function handleCommand(commandType: moveCommand) {
    setProgramRunResult(null)

    setMazeState((currentState) =>
      runCommand(activeLevel, currentState, commandType),
    )
  }

  function handleReset() {
    setMazeState(createInitialMazeState(activeLevel))
    setProgramRunResult(null)
  }

  function handleAddProgramCommand(commandType: moveCommand) {
    setProgramRunResult(null)
    setProgramCommands((currentCommands) => [...currentCommands, commandType])
  }

  function handleClearProgram() {
    setProgramCommands([])
    setProgramRunResult(null)
  }

  function handleRunProgram() {
    setMazeState((currentState) => {
      const result = runProgramCommands(currentState, programCommands)

      setProgramRunResult({
        commandCount: programCommands.length,
        attemptedCommands: result.attemptedCommands,
        finalStatus: getMazeStateStatus(result.finalState),
        finalMessage: getMazeStateMessage(result.finalState),
        reachedGoal: result.finalState.isComplete,
      })

      return result.finalState
    })
  }

  function runProgramCommands(
    startingState: mazeState,
    commands: moveCommand[],
  ) {
    let nextState = startingState
    const attemptedCommands: moveCommand[] = []

    for (const commandType of commands) {
      if (nextState.isComplete) {
        break
      }

      attemptedCommands.push(commandType)
      nextState = runCommand(activeLevel, nextState, commandType)
    }

    return {
      finalState: nextState,
      attemptedCommands,
    }
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

      <ProgramRunSummary result={programRunResult} />

      <CodeView commands={programCommands} isEmbedded />

      <MazeControls
        onCommand={handleCommand}
        onReset={handleReset}
        isComplete={mazeState.isComplete}
        hasErrors={validationErrors.length > 0}
      />

      <p className="panel-note">
        The command builder creates a planned program before it runs. The run
        summary explains what happened after the planned program was executed.
      </p>
    </section>
  )
}

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
import { ProgramStepControls } from './ProgramStepControls'

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

  const [isStepModeActive, setIsStepModeActive] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [stepAttemptedCommands, setStepAttemptedCommands] = useState<
    moveCommand[]
  >([])

  const activeCommandIndex =
    isStepModeActive && currentStepIndex < programCommands.length
      ? currentStepIndex
      : null

  const attemptedCommandCount = stepAttemptedCommands.length

  function clearStepRunState() {
    setIsStepModeActive(false)
    setCurrentStepIndex(0)
    setStepAttemptedCommands([])
  }

  function handleCommand(commandType: moveCommand) {
    clearStepRunState()
    setProgramRunResult(null)

    setMazeState((currentState) =>
      runCommand(activeLevel, currentState, commandType),
    )
  }

  function handleReset() {
    setMazeState(createInitialMazeState(activeLevel))
    clearStepRunState()
    setProgramRunResult(null)
  }

  function handleAddProgramCommand(commandType: moveCommand) {
    clearStepRunState()
    setProgramRunResult(null)
    setProgramCommands((currentCommands) => [...currentCommands, commandType])
  }

  function handleClearProgram() {
    setProgramCommands([])
    clearStepRunState()
    setProgramRunResult(null)
  }

  function handleRunProgram() {
    clearStepRunState()

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

  function handleStartStepRun() {
    const startingState = createInitialMazeState(activeLevel)

    setMazeState(startingState)
    setIsStepModeActive(true)
    setCurrentStepIndex(0)
    setStepAttemptedCommands([])

    setProgramRunResult({
      commandCount: programCommands.length,
      attemptedCommands: [],
      finalStatus: getMazeStateStatus(startingState),
      finalMessage: 'Step run started. Run the next command when ready.',
      reachedGoal: startingState.isComplete,
    })
  }

  function handleRunNextStep() {
    if (!isStepModeActive) {
      return
    }

    if (mazeState.isComplete) {
      setIsStepModeActive(false)
      return
    }

    const commandType = programCommands[currentStepIndex]

    if (!commandType) {
      setIsStepModeActive(false)
      return
    }

    const nextState = runCommand(activeLevel, mazeState, commandType)
    const nextAttemptedCommands = [...stepAttemptedCommands, commandType]
    const nextStepIndex = currentStepIndex + 1
    const hasMoreCommands = nextStepIndex < programCommands.length
    const shouldContinueStepMode = hasMoreCommands && !nextState.isComplete

    setMazeState(nextState)
    setStepAttemptedCommands(nextAttemptedCommands)
    setCurrentStepIndex(nextStepIndex)
    setIsStepModeActive(shouldContinueStepMode)

    setProgramRunResult({
      commandCount: programCommands.length,
      attemptedCommands: nextAttemptedCommands,
      finalStatus: getMazeStateStatus(nextState),
      finalMessage: getMazeStateMessage(nextState),
      reachedGoal: nextState.isComplete,
    })
  }

  function handleStopStepRun() {
    setIsStepModeActive(false)
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
          mazeState.isComplete ||
          isStepModeActive
        }
        isClearDisabled={programCommands.length === 0}
        activeCommandIndex={activeCommandIndex}
        attemptedCommandCount={attemptedCommandCount}
      />

      <ProgramStepControls
        programCommands={programCommands}
        currentStepIndex={currentStepIndex}
        isStepModeActive={isStepModeActive}
        onStartStepRun={handleStartStepRun}
        onRunNextStep={handleRunNextStep}
        onStopStepRun={handleStopStepRun}
        isStartDisabled={
          programCommands.length === 0 ||
          validationErrors.length > 0 ||
          isStepModeActive
        }
        isNextDisabled={
          !isStepModeActive ||
          validationErrors.length > 0 ||
          mazeState.isComplete ||
          currentStepIndex >= programCommands.length
        }
      />

      <ProgramRunSummary result={programRunResult} />

      <CodeView
        commands={programCommands}
        isEmbedded
        activeCommandIndex={activeCommandIndex}
        attemptedCommandCount={attemptedCommandCount}
      />

      <MazeControls
        onCommand={handleCommand}
        onReset={handleReset}
        isComplete={mazeState.isComplete}
        hasErrors={validationErrors.length > 0}
      />

      <p className="panel-note">
        The command builder creates a planned program before it runs. The active
        command and matching Python-style code line are highlighted during
        step-by-step execution.
      </p>
    </section>
  )
}

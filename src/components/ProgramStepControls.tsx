import type { moveCommand } from '../maze/mazeTypes'
import { getMazeCommandLabel } from '../commands/MazeCommandConfig'

type ProgramStepControlsProps = {
  programCommands: moveCommand[]
  currentStepIndex: number
  isStepModeActive: boolean
  onStartStepRun: () => void
  onRunNextStep: () => void
  onStopStepRun: () => void
  isStartDisabled: boolean
  isNextDisabled: boolean
}

export function ProgramStepControls({
  programCommands,
  currentStepIndex,
  isStepModeActive,
  onStartStepRun,
  onRunNextStep,
  onStopStepRun,
  isStartDisabled,
  isNextDisabled,
}: ProgramStepControlsProps) {
  const nextCommand = programCommands[currentStepIndex]
  const totalCommands = programCommands.length
  const displayStepNumber = totalCommands === 0 ? 0 : currentStepIndex + 1

  return (
    <div className="program-step-controls" aria-label="Step-by-step program controls">
      <h3>Step-by-Step Runner</h3>

      <p className="program-step-note">
        Use this section to run the planned program one command at a time.
      </p>

      <div className="program-step-status">
        <div>
          <strong>Step mode:</strong>
          <span>{isStepModeActive ? 'active' : 'not active'}</span>
        </div>

        <div>
          <strong>Current step:</strong>
          <span>
            {totalCommands === 0
              ? 'No commands'
              : `${displayStepNumber} of ${totalCommands}`}
          </span>
        </div>

        <div>
          <strong>Next command:</strong>
          <span>{nextCommand ? getMazeCommandLabel(nextCommand) : 'None'}</span>
        </div>
      </div>

      <div className="program-step-actions">
        <button type="button" onClick={onStartStepRun} disabled={isStartDisabled}>
          Start Step Run
        </button>

        <button type="button" onClick={onRunNextStep} disabled={isNextDisabled}>
          Run Next Command
        </button>

        <button type="button" onClick={onStopStepRun} disabled={!isStepModeActive}>
          Stop Step Run
        </button>
      </div>
    </div>
  )
}

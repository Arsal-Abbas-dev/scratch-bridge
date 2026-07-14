import type { moveCommand } from '../maze/mazeTypes'

type MazeControlsProps = {
  onCommand: (commandType: moveCommand) => void
  onReset: () => void
  isComplete: boolean
  hasErrors: boolean
}

export function MazeControls({
  onCommand,
  onReset,
  isComplete,
  hasErrors,
}: MazeControlsProps) {
  const movementDisabled = isComplete || hasErrors

  return (
    <div className="maze-controls" aria-label="Maze controls">
      <button
        type="button"
        disabled={movementDisabled}
        onClick={() => onCommand('move forward')}
      >
        Move Forward
      </button>

      <button
        type="button"
        disabled={movementDisabled}
        onClick={() => onCommand('turn left')}
      >
        Turn Left
      </button>

      <button
        type="button"
        disabled={movementDisabled}
        onClick={() => onCommand('turn right')}
      >
        Turn Right
      </button>

      <button type="button" disabled={hasErrors} onClick={onReset}>
        Reset
      </button>
    </div>
  )
}


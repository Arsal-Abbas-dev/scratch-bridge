import type { moveCommand } from '../maze/mazeTypes'

type CommandBuilderProps = {
  programCommands: moveCommand[]
  onAddCommand: (commandType: moveCommand) => void
  onClearProgram: () => void
  onRunProgram: () => void
  isRunDisabled: boolean
  isClearDisabled: boolean
  activeCommandIndex?: number | null
  attemptedCommandCount?: number
}

const commandLabels: Record<moveCommand, string> = {
  'move forward': 'Move Forward',
  'turn left': 'Turn Left',
  'turn right': 'Turn Right',
}

export function CommandBuilder({
  programCommands,
  onAddCommand,
  onClearProgram,
  onRunProgram,
  isRunDisabled,
  isClearDisabled,
  activeCommandIndex = null,
  attemptedCommandCount = 0,
}: CommandBuilderProps) {
  function getCommandClassName(index: number) {
    const classNames = ['program-command-item']

    if (index < attemptedCommandCount) {
      classNames.push('program-command-item-attempted')
    }

    if (activeCommandIndex === index) {
      classNames.push('program-command-item-active')
    }

    return classNames.join(' ')
  }

  return (
    <div className="command-builder" aria-label="Command program builder">
      <h3>Command Program Builder</h3>

      <p className="command-builder-note">
        Add commands to build a small program. Then run the whole program on the
        maze.
      </p>

      <div className="command-builder-buttons">
        <button type="button" onClick={() => onAddCommand('move forward')}>
          Add Move Forward
        </button>

        <button type="button" onClick={() => onAddCommand('turn left')}>
          Add Turn Left
        </button>

        <button type="button" onClick={() => onAddCommand('turn right')}>
          Add Turn Right
        </button>
      </div>

      <div className="program-list">
        <strong>Planned program:</strong>

        {programCommands.length === 0 ? (
          <p>No commands added yet.</p>
        ) : (
          <ol className="program-command-list">
            {programCommands.map((command, index) => (
              <li
                key={`${command}-${index}`}
                className={getCommandClassName(index)}
                aria-current={activeCommandIndex === index ? 'step' : undefined}
              >
                <span className="program-command-number">Step {index + 1}</span>
                <span>{commandLabels[command]}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="program-actions">
        <button type="button" onClick={onRunProgram} disabled={isRunDisabled}>
          Run Program
        </button>

        <button type="button" onClick={onClearProgram} disabled={isClearDisabled}>
          Clear Program
        </button>
      </div>
    </div>
  )
}

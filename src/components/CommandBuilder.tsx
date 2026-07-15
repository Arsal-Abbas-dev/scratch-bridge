import type { moveCommand } from '../maze/mazeTypes'

type CommandBuilderProps = {
    programCommands: moveCommand[]
    onAddCommand: (commandType: moveCommand) => void
    onClearProgram: () => void
    onRunProgram: () => void
    isRunDisabled: boolean
    isClearDisabled: boolean
}

const commandLabels: Record<moveCommand,string> = {
    'move forward' : 'Move Forward',
    'turn left' : 'Turn Left',
    'turn right' : 'Turn Right',
}

export function CommandBuilder({programCommands, onAddCommand, onClearProgram, onRunProgram, isRunDisabled, isClearDisabled}: CommandBuilderProps) {
    return (
        <div className='command-builder' aria-label='Command Program Builder'>
            <h3>Command Program Builder</h3>
            <p className = 'command-builder-note'>
                Add commands to build a program, then run it.
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
              <li key={`${command}-${index}`}>{commandLabels[command]}</li>
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
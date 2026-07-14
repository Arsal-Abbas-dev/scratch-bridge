import type { mazeState } from '../maze/mazeTypes'

type MazeStatePreviewProps = {
  mazeState: mazeState
}

export function MazeStatePreview({ mazeState }: MazeStatePreviewProps) {
  return (
    <div className="maze-state-preview">
      <p>
        <strong>Player position:</strong> row {mazeState.position.row},
        column {mazeState.position.col}
      </p>

      <p>
        <strong>Goal position:</strong> row {mazeState.goal.row}, column{' '}
        {mazeState.goal.col}
      </p>

      <p>
        <strong>Player direction:</strong> {mazeState.direction}
      </p>

      <p>
        <strong>Level complete:</strong> {mazeState.isComplete ? 'yes' : 'no'}
      </p>

      <p>
        <strong>Status:</strong> {mazeState.status}
      </p>

      <p>
        <strong>Message:</strong> {mazeState.message}
      </p>

      <p>
        <strong>Steps taken:</strong> {mazeState.stepsTaken}
      </p>

      <div>
        <strong>Command history:</strong>

        {mazeState.commandHistory.length === 0 ? (
          <p>No commands have been run yet.</p>
        ) : (
          <ol className="command-history">
            {mazeState.commandHistory.map((command, index) => (
              <li key={`${command}-${index}`}>{command}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

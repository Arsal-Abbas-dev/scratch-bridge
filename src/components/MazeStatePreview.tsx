import type { mazeState } from '../maze/mazeTypes'

type MazeStatePreviewProps = {
  mazeState: mazeState
}

export function MazeStatePreview({ mazeState }: MazeStatePreviewProps) {
  return (
    <div className="maze-state-preview">
      <p><strong>Player position:</strong> row {mazeState.position.row},
        column {mazeState.position.col}</p>
      <p><strong>Goal position:</strong> row {mazeState.goal.row}, column{' '}
        {mazeState.goal.col}</p>
      <p><strong>Player direction:</strong> {mazeState.direction}</p>
      <p><strong>Level complete:</strong> {mazeState.isComplete ? 'yes' : 'no'}</p>
    </div>
  )
}

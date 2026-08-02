import type { moveCommand } from '../maze/mazeTypes'
import { getMazeCommandLabel } from '../commands/MazeCommandConfig'

export type ProgramRunResult = {
  commandCount: number
  attemptedCommands: moveCommand[]
  finalStatus: string
  finalMessage: string
  reachedGoal: boolean
}

type ProgramRunSummaryProps = {
  result: ProgramRunResult | null
}

export function ProgramRunSummary({ result }: ProgramRunSummaryProps) {
  return (
    <div className="program-run-summary" aria-label="Program run summary">
      <h3>Program Run Summary</h3>

      {result === null ? (
        <p>No program has been run yet.</p>
      ) : (
        <>
          <div className="program-run-summary-grid">
            <div>
              <strong>Commands in program:</strong>
              <span>{result.commandCount}</span>
            </div>

            <div>
              <strong>Commands attempted:</strong>
              <span>{result.attemptedCommands.length}</span>
            </div>

            <div>
              <strong>Reached goal:</strong>
              <span>{result.reachedGoal ? 'yes' : 'no'}</span>
            </div>

            <div>
              <strong>Final status:</strong>
              <span>{result.finalStatus}</span>
            </div>
          </div>

          <div className="program-run-message">
            <strong>Final message:</strong>
            <p>{result.finalMessage}</p>
          </div>

          <div className="program-run-attempts">
            <strong>Commands attempted during run:</strong>

            {result.attemptedCommands.length === 0 ? (
              <p>No commands were attempted.</p>
            ) : (
              <ol>
                {result.attemptedCommands.map((command, index) => (
                  <li key={`${command}-${index}`}>
                    {getMazeCommandLabel(command)}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </>
      )}
    </div>
  )
}

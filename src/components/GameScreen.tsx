import { useCallback, useMemo, useState } from 'react'
import { useProgramRun } from '../hooks/useProgramRun'
import type { mazeLevel } from '../maze/mazeTypes'
import { programToPython } from '../program/programToPython'
import type { Program } from '../program/programTypes'
import { BlocklyWorkspaceShell, type ProgramChange } from './BlocklyWorkspaceShell'
import { CodeView } from './CodeView'
import { FeedbackPanel } from './FeedbackPanel'
import { MazeView } from './MazeView'
import { RunControls } from './RunControls'
 
type GameScreenProps = {
  level: mazeLevel
}
 
export function GameScreen({ level }: GameScreenProps) {
  const [program, setProgram] = useState<Program>([])
  const [errors, setErrors] = useState<string[]>([])
 
  const run = useProgramRun(level, program)
  const { reset } = run
 
  const pythonLines = useMemo(() => programToPython(program), [program])
 
  // Every time the blocks change, show the new program and start over.
  const handleProgramChange = useCallback(
    (change: ProgramChange) => {
      setProgram(change.program)
      setErrors(change.errors)
      reset()
    },
    [reset],
  )
 
  const hasErrors = errors.length > 0
  const feedbackMessage = hasErrors ? errors[0] : run.message
 
  let tone: 'info' | 'success' | 'error' = 'info'
  if (hasErrors || run.mazeState.status === 'blocked') {
    tone = 'error'
  } else if (run.mazeState.status === 'complete') {
    tone = 'success'
  }
 
  return (
    <section className="workspace-grid">
      <div className="panel blocks-panel">
        <div className="panel-header">
          <h2>Your blocks</h2>
        </div>
 
        <BlocklyWorkspaceShell
          onProgramChange={handleProgramChange}
          activeBlockId={run.activeNodeId}
        />
 
        <RunControls
          canRun={!hasErrors && program.length > 0}
          isRunning={run.isRunning}
          onRun={run.run}
          onStep={run.step}
          onReset={run.reset}
        />
      </div>
 
      <MazeView level={level} mazeState={run.mazeState} />
 
      <aside className="right-column">
        <CodeView pythonLines={pythonLines} activeNodeId={run.activeNodeId} />
        <FeedbackPanel message={feedbackMessage} tone={tone} />
      </aside>
    </section>
  )
}

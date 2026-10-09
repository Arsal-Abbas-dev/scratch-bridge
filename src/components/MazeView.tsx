import { validateMaze } from '../maze/mazeEngine'
import type { mazeLevel, mazeState } from '../maze/mazeTypes'
import { LevelSummary } from './LevelSummary'
import { MazeGrid } from './MazeGrid'
import { MazeValidationErrors } from './MazeValidationErrors'
 
type MazeViewProps = {
  level: mazeLevel
  mazeState: mazeState
}
 
export function MazeView({ level, mazeState }: MazeViewProps) {
  const validationErrors = validateMaze(level)
 
  return (
    <section className="panel maze-panel">
      <div className="panel-header">
        <h2>Maze</h2>
      </div>
 
      <LevelSummary level={level} />
 
      <MazeValidationErrors errors={validationErrors} />
 
      {validationErrors.length === 0 && (
        <MazeGrid grid={level.grid} mazeState={mazeState} />
      )}
    </section>
  )
}

type RunControlsProps = {
  canRun: boolean
  isRunning: boolean
  onRun: () => void
  onStep: () => void
  onReset: () => void
}
 
export function RunControls({
  canRun,
  isRunning,
  onRun,
  onStep,
  onReset,
}: RunControlsProps) {
  return (
    <div className="run-controls">
      <button
        type="button"
        className="run-button"
        onClick={onRun}
        disabled={!canRun || isRunning}
      >
        ▶ Run
      </button>
 
      <button type="button" onClick={onStep} disabled={!canRun || isRunning}>
        Step
      </button>
 
      <button type="button" onClick={onReset}>
        Reset
      </button>
    </div>
  )
}

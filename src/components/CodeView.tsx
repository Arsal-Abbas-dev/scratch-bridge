import type { PythonLine } from '../program/programToPython'
 
type CodeViewProps = {
  pythonLines: PythonLine[]
  activeNodeId: string | null
}
 
export function CodeView({ pythonLines, activeNodeId }: CodeViewProps) {
  return (
    <section className="panel code-panel">
      <div className="panel-header">
        <h2>Python code</h2>
      </div>
 
      <p className="code-view-intro">
        This is the same program, written in Python.
      </p>
 
      <pre className="code-preview" aria-label="Python code preview">
        <code>
          {pythonLines.length === 0 && (
            <span className="code-line"># Your Python shows up here.</span>
          )}
 
          {pythonLines.map((line, index) => (
            <span
              key={`${line.nodeId}-${index}`}
              className={
                line.nodeId === activeNodeId
                  ? 'code-line code-line-active'
                  : 'code-line'
              }
              aria-current={line.nodeId === activeNodeId ? 'step' : undefined}
              style={{ paddingLeft: `${line.depth * 24 + 6}px` }}
            >
              {line.text}
            </span>
          ))}
        </code>
      </pre>
    </section>
  )
}

import type { moveCommand } from '../maze/mazeTypes'
import { generatePythonCode } from '../code/pythonCodeGenerator'

type CodeViewProps = {
  commands?: moveCommand[]
  isEmbedded?: boolean
}

export function CodeView({ commands = [], isEmbedded = false }: CodeViewProps) {
  const pythonCode = generatePythonCode(commands)

  return (
    <section className={isEmbedded ? 'embedded-code-view' : 'panel code-panel'}>
      <div className="panel-header">
        <p className="panel-label">Step 3</p>
        <h2>Python Code View</h2>
      </div>

      <p className="code-view-intro">
        This preview shows how the planned maze program can be represented as
        Python code.
      </p>

      <pre className="code-preview" aria-label="Python code preview">
        <code>{pythonCode}</code>
      </pre>
    </section>
  )
}

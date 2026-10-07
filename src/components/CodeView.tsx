import type { PythonLine } from '../program/programToPython'

type CodeViewProps = {
  pythonLines?: PythonLine[]
  isEmbedded?: boolean
  activeCommandIndex?: number | null
  attemptedCommandCount?: number
}

export function CodeView({
  pythonLines = [],
  isEmbedded = false,
  activeCommandIndex = null,
  attemptedCommandCount = 0,
}: CodeViewProps) {
  function getCodeLineClassName(index: number) {
    const classNames = ['code-line']

    if (pythonLines.length > 0 && index < attemptedCommandCount) {
      classNames.push('code-line-attempted')
    }

    if (pythonLines.length > 0 && activeCommandIndex === index) {
      classNames.push('code-line-active')
    }

    return classNames.join(' ')
  }

  return (
    <section className={isEmbedded ? 'embedded-code-view' : 'panel code-panel'}>
      <div className="panel-header">
        <p className="panel-label">Step 3</p>
        <h2>Python Code View</h2>
      </div>

      <p className="code-view-intro">
        This preview shows how the planned maze program can be represented as
        Python-style code.
      </p>

      <pre className="code-preview" aria-label="Python code preview">
        <code>
          {pythonLines.map((line, index) => (
            <span
              key={`${line.nodeId}-${index}`}
              className={getCodeLineClassName(index)}
              aria-current={activeCommandIndex === index ? 'step' : undefined}
              style={{ paddingLeft: `${line.depth * 20}px` }}
            >
              {line.text}
              {index < pythonLines.length - 1 ? '\n' : ''}
            </span>
          ))}
        </code>
      </pre>
    </section>
  )
}
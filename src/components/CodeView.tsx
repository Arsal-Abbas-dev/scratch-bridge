import type { moveCommand } from '../maze/mazeTypes'
import { generatePythonCode } from '../code/pythonCodeGenerator'

type CodeViewProps = {
    commandHistory?: moveCommand[]
    isEmbedded?: boolean
}

export function CodeView({commandHistory = [], isEmbedded = false}: CodeViewProps) {
    const pythonCode = generatePythonCode(commandHistory)
    return (
        <section className={isEmbedded ? 'embedded-code-view' : 'panel code-panel'}>
            <div className='panel-header'>
                <p className='panel-label'>Step 3</p>
                <h2>Python Code View</h2>
            </div>
            <p className='code-view-intro'>
                This preview shows how the maze commands can be represented as Python code.
            </p>
            <pre className='code-preview' aria-label='Python Code Preview'>
                <code>{pythonCode}</code>
            </pre>
        </section>
    )
}
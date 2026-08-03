import type { moveCommand } from '../maze/mazeTypes'
import { getMazeCommandLabel } from '../commands/MazeCommandConfig'
import {
  convertBlockProgramToCommands,
  sampleMockBlockProgram,
} from '../blocks/blockCommandAdapter'

type BlockCommandAdapterPreviewProps = {
  onLoadCommands: (commands: moveCommand[]) => void
}

export function BlockCommandAdapterPreview({
  onLoadCommands,
}: BlockCommandAdapterPreviewProps) {
  const adapterResult = convertBlockProgramToCommands(sampleMockBlockProgram)
  const hasErrors = adapterResult.errors.length > 0

  return (
    <section className="block-command-adapter-preview">
      <h3>Simulated Block Adapter Test</h3>

      <p>
        This section simulates what will happen later when Blockly blocks are
        converted into the same internal command list used by the current
        program builder.
      </p>

      <div className="block-command-adapter-grid">
        <div>
          <strong>Simulated future block program:</strong>

          <ol>
            {sampleMockBlockProgram.map((block) => (
              <li key={block.id}>
                <code>{block.blockType}</code>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <strong>Converted internal commands:</strong>

          {adapterResult.commands.length === 0 ? (
            <p>No commands could be created.</p>
          ) : (
            <ol>
              {adapterResult.commands.map((command, index) => (
                <li key={`${command}-${index}`}>
                  <code>{command}</code> {getMazeCommandLabel(command)}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {hasErrors && (
        <div className="block-command-adapter-errors">
          <strong>Adapter errors:</strong>

          <ul>
            {adapterResult.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => onLoadCommands(adapterResult.commands)}
        disabled={hasErrors || adapterResult.commands.length === 0}
      >
        Load Simulated Block Program
      </button>
    </section>
  )
}

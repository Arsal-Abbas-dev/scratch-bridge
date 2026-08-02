import { mazeCommandConfigs } from '../commands/MazeCommandConfig'

export function CommandMappingPreview() {
  return (
    <section className="command-mapping-preview">
      <h3>Command Mapping Reference</h3>

      <p>
        This table shows how each internal maze command connects to the learner
        label, Python-style code, and future Blockly block type.
      </p>

      <div className="command-mapping-table-wrapper">
        <table className="command-mapping-table">
          <thead>
            <tr>
              <th>Internal command</th>
              <th>Learner label</th>
              <th>Python-style code</th>
              <th>Future Blockly block</th>
            </tr>
          </thead>

          <tbody>
            {mazeCommandConfigs.map((commandConfig) => (
              <tr key={commandConfig.type}>
                <td>
                  <code>{commandConfig.type}</code>
                </td>
                <td>{commandConfig.label}</td>
                <td>
                  <code>{commandConfig.pythonCode}</code>
                </td>
                <td>
                  <code>{commandConfig.futureBlocklyBlockType}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

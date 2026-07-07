export function BlocklyWorkspacePlaceholder() {
  return (
    <section className="panel blockly-panel">
      <div className="panel-header">
        <p className="panel-label">Step 1</p>
        <h2>Block Workspace</h2>
      </div>

      <div className="placeholder-box blockly-placeholder">
        <div className="fake-block fake-block-blue">move_forward()</div>
        <div className="fake-block fake-block-purple">turn_left()</div>
        <div className="fake-block fake-block-green">repeat 3 times</div>
      </div>

      <p className="panel-note">
        This area will later contain the Google Blockly workspace where learners
        create programs using visual blocks.
      </p>
    </section>
  )
}

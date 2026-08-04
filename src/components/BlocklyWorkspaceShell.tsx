import { useEffect, useRef, useState } from 'react'
import * as Blockly from 'blockly/core'
import 'blockly/blocks'
import * as En from 'blockly/msg/en'
import { emptyBlocklyToolbox } from '../blockly/emptyToolbox'

Blockly.setLocale(En.default)

export function BlocklyWorkspaceShell() {
  const blocklyContainerRef = useRef<HTMLDivElement | null>(null)
  const [workspaceReady, setWorkspaceReady] = useState(false)

  useEffect(() => {
    const blocklyContainer = blocklyContainerRef.current

    if (!blocklyContainer) {
      return
    }

    const workspace = Blockly.inject(blocklyContainer, {
      toolbox: emptyBlocklyToolbox,
      trashcan: true,
      scrollbars: true,
      sounds: false,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: 1.4,
        minScale: 0.7,
        scaleSpeed: 1.1,
      },
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
    })

    setWorkspaceReady(true)

    const handleResize = () => {
      Blockly.svgResize(workspace)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      workspace.dispose()
    }
  }, [])

  return (
    <section className="blockly-workspace-shell">
      <div className="blockly-workspace-shell-header">
        <div>
          <h3>Real Blockly Workspace</h3>

          <p>
            Blockly is now installed and running. Custom maze blocks will be
            added on a later development day.
          </p>
        </div>

        <span
          className={
            workspaceReady
              ? 'blockly-status blockly-status-ready'
              : 'blockly-status'
          }
        >
          {workspaceReady ? 'Workspace ready' : 'Workspace loading'}
        </span>
      </div>

      <div className="blockly-workspace-notice">
        <strong>Day 13 workspace shell</strong>

        <p>
          The workspace is intentionally empty. It is not connected to the
          planned program, Python Code View, or maze runner yet.
        </p>
      </div>

      <div
        ref={blocklyContainerRef}
        className="blockly-workspace-container"
        aria-label="Empty Blockly workspace"
      />
    </section>
  )
}

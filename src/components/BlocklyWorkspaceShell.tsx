import { useEffect, useRef, useState } from 'react'
import * as Blockly from 'blockly/core'
import 'blockly/blocks'
import * as En from 'blockly/msg/en'
import { mazeBlocklyToolbox } from '../blockly/mazeToolbox'

Blockly.setLocale(En as unknown as { [key: string]: string })
export function BlocklyWorkspaceShell() {
  const blocklyContainerRef = useRef<HTMLDivElement | null>(null)
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
  const [workspaceReady, setWorkspaceReady] = useState(false)
  const [selectedCategoryName, setSelectedCategoryName] =
    useState('No category selected')

  useEffect(() => {
    const blocklyContainer = blocklyContainerRef.current

    if (!blocklyContainer) {
      return
    }

    const workspace = Blockly.inject(blocklyContainer, {
      toolbox:
        mazeBlocklyToolbox as Blockly.utils.toolbox.ToolboxDefinition,
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

    workspaceRef.current = workspace
    setWorkspaceReady(true)

    const toolbox = workspace.getToolbox()

  const handleToolboxSelection = () => {
  const selectedItem = toolbox?.getSelectedItem()

  if (!selectedItem) {
    setSelectedCategoryName('No category selected')
    return
  }

  const selectedItemElement = selectedItem.getClickTarget()

  if (!selectedItemElement) {
    setSelectedCategoryName('No category selected')
    return
  }

  const selectedText = selectedItemElement.textContent?.trim() ?? ''

  setSelectedCategoryName(selectedText || 'Category selected')
}

    const handleWorkspaceClick = () => {
      window.setTimeout(handleToolboxSelection, 0)
    }

    const handleResize = () => {
      Blockly.svgResize(workspace)
    }

    blocklyContainer.addEventListener('click', handleWorkspaceClick)
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      blocklyContainer.removeEventListener('click', handleWorkspaceClick)
      window.removeEventListener('resize', handleResize)
      workspace.dispose()
      workspaceRef.current = null
    }
  }, [])

  function handleResetWorkspaceView() {
    const workspace = workspaceRef.current

    if (!workspace) {
      return
    }

    workspace.scrollCenter()
    workspace.setScale(1)
    Blockly.svgResize(workspace)
  }

  function handleOpenMovementCategory() {
    const workspace = workspaceRef.current
    const toolbox = workspace?.getToolbox()

    if (!toolbox) {
      return
    }

    const movementCategory = toolbox.getToolboxItems().find(item => item.getId() === 'maze-movement-category')

    if (!movementCategory) {
      return
    }

    toolbox.setSelectedItem(movementCategory)
    setSelectedCategoryName('Maze Movement')
  }

  return (
    <section className="blockly-workspace-shell">
      <div className="blockly-workspace-shell-header">
        <div>
          <h3>Real Blockly Workspace</h3>

          <p>
            Explore the toolbox categories to see how the visual programming
            area will be organized.
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

      <div className="blockly-workspace-instructions">
        <h4>How to explore the workspace today</h4>

        <ol>
          <li>Select Maze Movement in the toolbox.</li>
          <li>Read the message explaining which blocks will be added next.</li>
          <li>Select Loops and Conditions to preview the future structure.</li>
          <li>Use the zoom controls to practise navigating the workspace.</li>
        </ol>

      </div>

      <div className="blockly-workspace-summary">
        <div>
          <strong>Toolbox categories:</strong>
          <span>3</span>
        </div>

        <div>
          <strong>Functional custom blocks:</strong>
          <span>0</span>
        </div>

        <div>
          <strong>Selected category:</strong>
          <span>{selectedCategoryName}</span>
        </div>

        <div>
          <strong>Connected to maze program:</strong>
          <span>No</span>
        </div>
      </div>

      <div className="blockly-workspace-actions">
        <button
          type="button"
          onClick={handleOpenMovementCategory}
          disabled={!workspaceReady}
        >
          Open Maze Movement Category
        </button>

        <button
          type="button"
          onClick={handleResetWorkspaceView}
          disabled={!workspaceReady}
        >
          Reset Workspace View
        </button>
      </div>

      <div
        ref={blocklyContainerRef}
        className="blockly-workspace-container"
        aria-label="Blockly workspace with planned toolbox categories"
      />
    </section>
  )
}

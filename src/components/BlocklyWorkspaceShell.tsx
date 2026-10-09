import { useEffect, useRef } from 'react'
import * as Blockly from 'blockly/core'
import 'blockly/blocks'
import * as En from 'blockly/msg/en'
import '../blockly/mazeBlocks'
import { mazeBlocklyToolbox } from '../blockly/mazeToolbox'
import { blocklyToProgram } from '../program/blocklyToProgram'
import type { Program } from '../program/programTypes'
 
Blockly.setLocale(En as unknown as { [key: string]: string })
 
export type ProgramChange = {
  program: Program
  errors: string[]
}
 
type BlocklyWorkspaceShellProps = {
  onProgramChange: (change: ProgramChange) => void
  activeBlockId: string | null
}
 
export function BlocklyWorkspaceShell({
  onProgramChange,
  activeBlockId,
}: BlocklyWorkspaceShellProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
  const onProgramChangeRef = useRef(onProgramChange)
 
  // Always call the newest version of the callback, without rebuilding the workspace.
  useEffect(() => {
    onProgramChangeRef.current = onProgramChange
  }, [onProgramChange])
 
  useEffect(() => {
    const container = containerRef.current
 
    if (!container) {
      return
    }
 
    const workspace = Blockly.inject(container, {
      toolbox: mazeBlocklyToolbox as Blockly.utils.toolbox.ToolboxDefinition,
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
 
    const handleWorkspaceChange = (event: Blockly.Events.Abstract) => {
      if (event.isUiEvent) {
        return
      }
      onProgramChangeRef.current(blocklyToProgram(workspace))
    }
 
    workspace.addChangeListener(handleWorkspaceChange)
 
    Blockly.serialization.workspaces.load(
      {
        blocks: {
          languageVersion: 0,
          blocks: [
            {
              type: 'maze_start',
              id: 'start-block',
              x: 40,
              y: 40,
            },
          ],
        },
      },
      workspace,
    )
 
    const handleResize = () => {
      Blockly.svgResize(workspace)
    }
 
    window.addEventListener('resize', handleResize)
    handleResize()
 
    return () => {
      window.removeEventListener('resize', handleResize)
      workspace.dispose()
      workspaceRef.current = null
    }
  }, [])
 
  // Light up the block that is running right now.
  useEffect(() => {
    workspaceRef.current?.highlightBlock(activeBlockId)
  }, [activeBlockId])
 
  return (
    <div
      ref={containerRef}
      className="blockly-workspace-container"
      aria-label="Block workspace"
    />
  )
}

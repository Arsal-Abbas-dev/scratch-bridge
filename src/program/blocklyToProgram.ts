import * as Blockly from 'blockly/core'
import { friendlyMessage } from '../hybrid/friendlyErrors'
import { parseLine } from '../hybrid/pythonParser'
import type { Program } from './programTypes'
 
const moveActions = {
  maze_move_forward: 'forward',
  maze_turn_left: 'left',
  maze_turn_right: 'right',
} as const

function readStack(firstBlock: Blockly.Block | null, errors: string[]): Program {
  const steps: Program = []
  let block = firstBlock
 
  while (block) {
    if (block.type === 'maze_repeat') {
      const times = Number(block.getFieldValue('times'))
      const body = readStack(block.getInputTargetBlock('do'), errors)
 
      steps.push({
        kind: 'repeat',
        times,
        body,
        origin: { blockId: block.id, form: 'block' },
      })
    } else if (block.type in moveActions) {
      const action = moveActions[block.type as keyof typeof moveActions]
 
      steps.push({
        kind: 'move',
        action,
        origin: { blockId: block.id, form: 'block' },
      })
    } else if (block.type === 'py_line') {
      const result = parseLine(String(block.getFieldValue('TEXT') ?? ''))
 
      if (!result.ok) {
        errors.push(result.message)
        block.setWarningText(result.message)
      } else if (result.node.kind === 'loop') {
        const message = friendlyMessage('LOOP_NEEDS_BLOCKS')
        errors.push(message)
        block.setWarningText(message)
      } else {
        block.setWarningText(null)
        steps.push({
          kind: 'move',
          action: result.node.action,
          origin: { blockId: block.id, form: 'text' },
        })
      }
    } else {
      errors.push(`Could not understand the block "${block.type}".`)
    }
 
    block = block.getNextBlock()
  }
 
  return steps
}
 
export function blocklyToProgram(workspace: Blockly.Workspace) {
  const errors: string[] = []
  const startBlock = workspace
    .getTopBlocks(true)
    .find((block) => block.type === 'maze_start')
 
  if (!startBlock) {
    errors.push('Could not find the start block.')
    return { program: [] as Program, errors }
  }
 
  const program = readStack(startBlock.getNextBlock(), errors)
 
  return { program, errors }
}

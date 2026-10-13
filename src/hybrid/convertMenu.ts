import * as Blockly from 'blockly/core'
import { parseLine } from './pythonParser'
 
const pythonByBlockType = new Map<string, string>([
  ['maze_move_forward', 'move_forward()'],
  ['maze_turn_left', 'turn_left()'],
  ['maze_turn_right', 'turn_right()'],
])
 
const blockTypeByAction = {
  forward: 'maze_move_forward',
  left: 'maze_turn_left',
  right: 'maze_turn_right',
} as const
 
function swapBlock(oldBlock: Blockly.BlockSvg, newType: string, text?: string) {
  const workspace = oldBlock.workspace as Blockly.WorkspaceSvg
  const previous = oldBlock.previousConnection?.targetConnection ?? null
  const position = oldBlock.getRelativeToSurfaceXY()
 
  Blockly.Events.setGroup(true)
 
  try {
    oldBlock.dispose(true)
 
    const newBlock = workspace.newBlock(newType)
 
    if (text !== undefined) {
      newBlock.setFieldValue(text, 'TEXT')
    }
 
    newBlock.initSvg()
    newBlock.render()
 
    if (previous && newBlock.previousConnection) {
      newBlock.previousConnection.connect(previous)
    } else {
      newBlock.moveTo(position)
    }
  } finally {
    Blockly.Events.setGroup(false)
  }
}
 
export function registerConvertMenu() {
  const registry = Blockly.ContextMenuRegistry.registry
 
  if (registry.getItem('convert_to_python')) {
    return
  }
 
  registry.register({
    id: 'convert_to_python',
    weight: 100,
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    displayText: 'Convert to Python',
    preconditionFn: (scope) =>
      scope.block && pythonByBlockType.has(scope.block.type) ? 'enabled' : 'hidden',
    callback: (scope) => {
      const block = scope.block
      const text = block ? pythonByBlockType.get(block.type) : undefined
 
      if (block && text) {
        swapBlock(block, 'py_line', text)
      }
    },
  })
 
  registry.register({
    id: 'back_to_block',
    weight: 101,
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    displayText: 'Back to block',
    preconditionFn: (scope) => {
      const block = scope.block
 
      if (!block || block.type !== 'py_line') {
        return 'hidden'
      }
 
      const result = parseLine(String(block.getFieldValue('TEXT') ?? ''))
 
      return result.ok && result.node.kind === 'move' ? 'enabled' : 'disabled'
    },
    callback: (scope) => {
      const block = scope.block
 
      if (!block || block.type !== 'py_line') {
        return
      }
 
      const result = parseLine(String(block.getFieldValue('TEXT') ?? ''))
 
      if (result.ok && result.node.kind === 'move') {
        swapBlock(block, blockTypeByAction[result.node.action])
      }
    },
  })
}

import type {Program} from './programTypes'
import * as Blockly from 'blockly/core'
const blockToAction = {
  maze_move_forward: 'forward',
  maze_turn_left: 'left',
  maze_turn_right: 'right',
} as const
export function blocklyToProgram(workspace: Blockly.Workspace) {
    const program: Program = []
    const errors: string[] = []
    const startblock = workspace.getTopBlocks(true).find(block => block.type === 'maze_start')
    if (!startblock) {
        errors.push('Could not find start block.')
    }
    else {
        let nextblock = startblock.getNextBlock()
        while (nextblock) {
            if (nextblock.type !== 'maze_move_forward' && nextblock.type !== 'maze_turn_right' && nextblock.type !== 'maze_turn_left'){
                errors.push(`Could not understand ${nextblock.type}.`)
                continue
            }
            const action = blockToAction[nextblock.type as keyof typeof blockToAction]
            program.push({kind: 'move', action, origin: {blockId: nextblock.id, form: 'block'}})
            nextblock = nextblock.getNextBlock()
        }
    }
    return {program, errors}
}
import { describe, it, expect } from 'vitest'
import * as Blockly from 'blockly/core'
import '../blockly/mazeBlocks' // this line creates the blocks, so they exist in the test
import { blocklyToProgram } from './blocklyToProgram'
 
describe('blocklyToProgram', () => {
  it('reads two move blocks under the start block', () => {
    const workspace = new Blockly.Workspace()
    const start = workspace.newBlock('maze_start')
    const first = workspace.newBlock('maze_move_forward')
    const second = workspace.newBlock('maze_turn_left')
 
    start.nextConnection!.connect(first.previousConnection!)
    first.nextConnection!.connect(second.previousConnection!)
 
    const result = blocklyToProgram(workspace)
 
    expect(result.errors).toEqual([])
    expect(result.program).toHaveLength(2)
    expect(result.program[0]).toMatchObject({ kind: 'move', action: 'forward' })
    expect(result.program[1]).toMatchObject({ kind: 'move', action: 'left' })
  })
 
  it('gives one error and no steps when there is no start block', () => {
    const workspace = new Blockly.Workspace()
    const result = blocklyToProgram(workspace)
 
    expect(result.errors).toHaveLength(1)
    expect(result.program).toEqual([])
  })
})

import { describe, it, expect } from 'vitest'
import * as Blockly from 'blockly/core'
import '../blockly/mazeBlocks'
import '../hybrid/hybridBlocks' 
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

describe('blocklyToProgram with loops', () => {
  it('reads the blocks inside a repeat block', () => {
    const workspace = new Blockly.Workspace()
    const start = workspace.newBlock('maze_start')
    const loop = workspace.newBlock('maze_repeat')
    const inside = workspace.newBlock('maze_move_forward')
 
    loop.setFieldValue(4, 'times')
    start.nextConnection!.connect(loop.previousConnection!)
    loop.getInput('do')!.connection!.connect(inside.previousConnection!)
 
    const result = blocklyToProgram(workspace)
 
    expect(result.errors).toEqual([])
    expect(result.program).toHaveLength(1)
    expect(result.program[0]).toMatchObject({ kind: 'repeat', times: 4 })
    expect(result.program[0]).toMatchObject({ body: [{ kind: 'move', action: 'forward' }] })
  })
 
  it('reads a loop inside a loop', () => {
    const workspace = new Blockly.Workspace()
    const start = workspace.newBlock('maze_start')
    const outer = workspace.newBlock('maze_repeat')
    const inner = workspace.newBlock('maze_repeat')
    const move = workspace.newBlock('maze_turn_right')
 
    start.nextConnection!.connect(outer.previousConnection!)
    outer.getInput('do')!.connection!.connect(inner.previousConnection!)
    inner.getInput('do')!.connection!.connect(move.previousConnection!)
 
    const result = blocklyToProgram(workspace)
    const outerStep = result.program[0]
 
    expect(outerStep).toMatchObject({ kind: 'repeat' })
    expect(outerStep).toMatchObject({ body: [{ kind: 'repeat', body: [{ kind: 'move', action: 'right' }] }] })
  })
})

describe('blocklyToProgram with typed Python blocks', () => {
  function programWithTypedLine(text: string) {
    const workspace = new Blockly.Workspace()
    const start = workspace.newBlock('maze_start')
    const typed = workspace.newBlock('py_line')
 
    typed.setFieldValue(text, 'TEXT')
    start.nextConnection!.connect(typed.previousConnection!)
 
    return blocklyToProgram(workspace)
  }
 
  it('a typed move line gives the same step as a block, except form is text', () => {
    const typed = programWithTypedLine('move_forward()')
 
    const workspace = new Blockly.Workspace()
    const start = workspace.newBlock('maze_start')
    const block = workspace.newBlock('maze_move_forward')
    start.nextConnection!.connect(block.previousConnection!)
    const fromBlock = blocklyToProgram(workspace)
 
    expect(typed.errors).toEqual([])
    expect(typed.program[0]).toMatchObject({ kind: 'move', action: 'forward' })
    expect(typed.program[0]).toMatchObject({ origin: { form: 'text' } })
    expect(fromBlock.program[0]).toMatchObject({ kind: 'move', action: 'forward' })
    expect(fromBlock.program[0]).toMatchObject({ origin: { form: 'block' } })
  })
 
  it('bad typed text gives a friendly error and no crash', () => {
    const result = programWithTypedLine('move_foward()')
 
    expect(result.program).toEqual([])
    expect(result.errors).toEqual(['I don\'t know "move_foward". Did you mean move_forward()?'])
  })
 
  it('an empty text block gives an error', () => {
    const result = programWithTypedLine('')
    expect(result.errors).toHaveLength(1)
  })
})

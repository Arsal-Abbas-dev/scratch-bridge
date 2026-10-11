import { describe, it, expect } from 'vitest'
import { createInitialMazeState } from '../maze/mazeEngine'
import type { mazeLevel } from '../maze/mazeTypes'
import { sampleMazes } from '../maze/sampleMazes'
import { maxSteps, runProgram } from './programRunner'
import type { Program, ProgramNode } from './programTypes'
 
let counter = 0
function move(action: 'forward' | 'left' | 'right'): ProgramNode {
  counter += 1
  return { kind: 'move', action, origin: { blockId: `m${counter}`, form: 'block' } }
}
function repeat(times: number, body: Program): ProgramNode {
  counter += 1
  return { kind: 'repeat', times, body, origin: { blockId: `r${counter}`, form: 'block' } }
}
 
function runAll(level: mazeLevel, program: Program) {
  const generator = runProgram(level, program, createInitialMazeState(level))
  const steps = []
  let result = generator.next()
 
  while (!result.done) {
    steps.push(result.value)
    result = generator.next()
  }
 
  return { steps, reason: result.value }
}
 
const level = (id: number) => sampleMazes.find((item) => item.id === id)!
 
describe('level solutions', () => {
  it('level 1 is solved by forward, forward', () => {
    const result = runAll(level(1), [move('forward'), move('forward')])
    expect(result.reason).toBe('complete')
  })
 
  it('level 2 is solved by one turn right and one turn left', () => {
    const program = [
      move('forward'), move('right'), move('forward'), move('forward'),
      move('left'), move('forward'), move('forward'), move('forward'),
    ]
    expect(runAll(level(2), program).reason).toBe('complete')
  })
 
  it('level 3 is solved with two loops', () => {
    const program = [repeat(4, [move('forward')]), move('right'), repeat(4, [move('forward')])]
    expect(runAll(level(3), program).reason).toBe('complete')
  })
 
  it('level 4 is solved with a loop that has a turn inside', () => {
    const program = [
      repeat(3, [move('forward'), move('right'), move('forward'), move('left')]),
      move('forward'),
    ]
    expect(runAll(level(4), program).reason).toBe('complete')
  })
})
 
describe('program runner', () => {
  it('yields one step for every move it runs', () => {
    const result = runAll(level(3), [repeat(4, [move('forward')])])
    expect(result.steps).toHaveLength(4)
    expect(result.reason).toBe('finished')
  })
 
  it('stops at the first wall', () => {
    const result = runAll(level(1), [move('left'), move('forward'), move('forward'), move('forward')])
    expect(result.reason).toBe('blocked')
    expect(result.steps).toHaveLength(2)
  })
 
  it('stops a runaway program at the step limit', () => {
    const program = [repeat(20, [repeat(20, [repeat(2, [move('left')])])])]
    const result = runAll(level(1), program)
    expect(result.reason).toBe('too_many_steps')
    expect(result.steps).toHaveLength(maxSteps)
  })
 
  it('skips loops that have nothing inside', () => {
    const program = [repeat(20, [repeat(20, [repeat(20, [])])])]
    const result = runAll(level(1), program)
    expect(result.reason).toBe('finished')
    expect(result.steps).toHaveLength(0)
  })
})

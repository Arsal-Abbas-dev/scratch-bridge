import { describe, it, expect } from 'vitest'
import {
  createInitialMazeState,
  findCellPosition,
  runCommand,
  turnLeft,
  turnRight,
  validateMaze,
} from './mazeEngine'
import type { mazeCell, mazeLevel } from './mazeTypes'
import { sampleMazes } from './sampleMazes'
 
// A small helper that makes a level from a grid.
function makeLevel(grid: mazeCell[][], facing: mazeLevel['facing'] = 'right'): mazeLevel {
  return { id: 99, name: 'Test', concept: 'Test', instructions: '', grid, facing }
}
 
const straightPath = sampleMazes[1]!  // start (2,1), goal (2,3)
const basePlate = sampleMazes[0]!     // open 5x5 grid, start at the top-left corner
 
describe('maze engine', () => {
  it('finds the start and the goal', () => {
    expect(findCellPosition(straightPath.grid, 'start')).toEqual({ row: 2, col: 1 })
    expect(findCellPosition(straightPath.grid, 'goal')).toEqual({ row: 2, col: 3 })
  })
 
  it('rejects a maze with no start cell', () => {
    const level = makeLevel([['path', 'goal']])
    expect(validateMaze(level)).toContain('The maze must contain exactly 1 start cell.')
  })
 
  it('rejects a maze with two goal cells', () => {
    const level = makeLevel([['start', 'goal', 'goal']])
    expect(validateMaze(level)).toContain('The maze must contain exactly 1 goal cell.')
  })
 
  it('rejects a maze whose rows have different lengths', () => {
    const level = makeLevel([['start', 'path'], ['goal']])
    expect(validateMaze(level)).toContain('All rows must have the same number of cells')
  })
 
  it('turning left four times gives the starting direction again', () => {
    let direction = turnLeft('up')
    direction = turnLeft(direction)
    direction = turnLeft(direction)
    direction = turnLeft(direction)
    expect(direction).toBe('up')
  })
 
  it('turning right undoes turning left', () => {
    expect(turnRight(turnLeft('right'))).toBe('right')
    expect(turnRight(turnLeft('up'))).toBe('up')
  })
 
  it('moving into a wall is blocked and the position does not change', () => {
    let state = createInitialMazeState(straightPath)
    state = runCommand(straightPath, state, 'turn left') // now facing up, the wall is above
    const before = state.position
    state = runCommand(straightPath, state, 'move forward')
    expect(state.status).toBe('blocked')
    expect(state.position).toEqual(before)
  })
 
  it('moving off the edge of the maze is blocked', () => {
    let state = createInitialMazeState(basePlate)
    state = runCommand(basePlate, state, 'turn left') // facing up, at the top row
    state = runCommand(basePlate, state, 'move forward')
    expect(state.status).toBe('blocked')
    expect(state.position).toEqual({ row: 0, col: 0 })
  })
 
  it('reaching the goal completes the level', () => {
    let state = createInitialMazeState(straightPath)
    state = runCommand(straightPath, state, 'move forward')
    state = runCommand(straightPath, state, 'move forward')
    expect(state.status).toBe('complete')
    expect(state.isComplete).toBe(true)
  })
 
  it('the start direction comes from level.facing', () => {
    const level = makeLevel([['start', 'goal']], 'down')
    expect(createInitialMazeState(level).direction).toBe('down')
  })
})

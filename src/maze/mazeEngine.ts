import type { mazeCell , mazeLevel, mazeState, position, direction, moveCommand, mazeBlock } from './mazeTypes'


export function createInitialMazeState(level: mazeLevel): mazeState {
    return {
        id: level.id,
        position: findCellPosition(level.grid, 'start'),
        direction: 'right',
        goal: findCellPosition(level.grid, 'goal'),
        isComplete: false,
        status: 'ready',
        stepsTaken: 0,
        commandHistory: [],
        lastError: null,
        message: ''
    }
}

const directionMovement: Record<direction, position> = {
  up: { row: -1, col: 0 },
  right: { row: 0, col: 1 },
  down: { row: 1, col: 0 },
  left: { row: 0, col: -1 },
}

export function findCellPosition(grid: mazeCell[][], target: mazeCell): position {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === target) {
                return {row,col}
            }
        }
    }
    throw new Error('Maze cell "$(target)" was not found.')
}

export function validateMaze(level: mazeLevel): string[] {
    const errors: string[] = []
    if (level.grid.length === 0) {
        errors.push('The maze must contain at least one row.')
        return errors
    }
    const numColumns = level.grid[0].length
    if (numColumns === 0) {
        errors.push('The maze must contain at least one column')
    }

    let startCount = 0
    let goalCount = 0

    for (let row = 0; row < level.grid.length; row++) {
        if (level.grid[row].length !== numColumns) {
            errors.push('All rows must have the same number of cells')
            return errors
        }
        for (const cell of level.grid[row]) {
            if (cell === 'start') {
                startCount++
            }
            if (cell === 'goal') {
                goalCount++
            }
        }
    }
    if (startCount !== 1) {
        errors.push('The maze must contain exactly 1 start cell.')
    }
    if (goalCount !== 1) {
        errors.push('The maze must contain exactly 1 goal cell.')
    }
    return errors
}
export function runCommand(level: mazeLevel, state: mazeState, command: moveCommand): mazeState {
    if (state.status === 'complete') {
        return {
            ...state,
            message: 'The level is already complete. Press Reset to try again.'
        }
    }
    const commandHistory = [...state.commandHistory, command]
    if (command === 'turn left') {
        return {
            ...state,
            direction: turnLeft(state.direction),
            status: 'running',
            message: 'Turned left.',
            stepsTaken: state.stepsTaken + 1,
            commandHistory: commandHistory,
            lastError: null,

        }
    }
    if (command === 'turn right') {
        return {
            ...state,
            direction: turnRight(state.direction),
            status: 'running',
            message: 'Turned right.',
            stepsTaken: state.stepsTaken + 1,
            commandHistory: commandHistory,
            lastError: null,

        }
    }
    if (command === 'move forward') {
        const next = getNextBlock(state.position, state.direction, level)
        if (next.type === 'wall') {
            return {
                ...state,
                status: 'blocked',
                message: 'Blocked by a wall. Try turning first.',
                lastError: 'The player tried to move into a wall.',
                stepsTaken: state.stepsTaken+1,
                commandHistory: commandHistory,
            }
        }
        const win = next.type === 'goal' ? true : false
        return {
            ...state,
            position: next.position,
            isComplete: win,
            status: win ? 'complete' : 'running',
            message: win ? 'Success! You reached the goal.' : 'Moved forward.',
            commandHistory: commandHistory,
            stepsTaken: state.stepsTaken+1,
            lastError: null,
        }
    }
    return state
}
export function getNextBlock(pos: position, dir: direction, level: mazeLevel): mazeBlock {
    const move = directionMovement[dir]
    const row = pos.row + move.row
    const col = pos.col + move.col
    if (row < 0 || row >= level.grid.length) {
        return {type: 'wall', position: {row, col}}
    }
    if (col < 0 || col >= level.grid[row].length) {
        return {type: 'wall', position: {row, col}}
    }

    return {type: level.grid[row][col], position: {row, col}}
}
export function turnLeft(dir: direction): direction {
    if (dir == 'up') return 'left'
    if (dir == 'left') return 'down'
    if (dir == 'down') return 'right'
    else return 'up'
}
export function turnRight(dir: direction): direction {
    if (dir == 'down') return 'left'
    if (dir == 'right') return 'down'
    if (dir == 'up') return 'right'
    else return 'up'
}
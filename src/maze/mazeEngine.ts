import type { mazeCell , mazeLevel, mazeState, position } from './mazeTypes'

export function createInitialMazeState(level: mazeLevel): mazeState {
    return {
        id: level.id,
        position: findCellPosition(level.grid, 'start'),
        direction: 'right',
        goal: findCellPosition(level.grid, 'goal'),
        isComplete: false,
    }
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
        errors.push('The maze must contain at leas one column')
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
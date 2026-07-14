export type mazeCell = 'wall' | 'path' | 'start' | 'goal'
export type direction = 'up' | 'down' | 'left' | 'right'
export type moveCommand = 'move forward' | 'turn left' | 'turn right'
export type status = 'ready' | 'running' |  'blocked' | 'complete' | 'error'
export type position = {
    row: number
    col: number
}
export type mazeLevel = {
    id: number
    name: string
    concept: string
    instructions: string
    grid: mazeCell[][]
    facing: direction
}
export type mazeBlock = {
    type: mazeCell
    position: position
}
export type mazeState = {
    id: number
    position: position
    direction: direction
    goal: position
    isComplete: boolean
    status: status
    message: string
    stepsTaken: number
    commandHistory: moveCommand[]
    lastError: string | null
}
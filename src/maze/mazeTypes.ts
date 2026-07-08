export type mazeCell = 'wall' | 'path' | 'start' | 'goal'
export type direction = 'up' | 'down' | 'left' | 'right'
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
}
export type mazeState = {
    id: number
    position: position
    direction: direction
    goal: position
    isComplete: boolean
}
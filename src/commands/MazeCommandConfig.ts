import type { moveCommand } from '../maze/mazeTypes'

export type MazeCommandConfig = {
  type: moveCommand
  label: string
  pythonCode: string
  futureBlocklyBlockType: string
  description: string
}

export const mazeCommandConfigs: MazeCommandConfig[] = [
  {
    type: 'move forward',
    label: 'Move Forward',
    pythonCode: 'move_forward()',
    futureBlocklyBlockType: 'maze_move_forward',
    description: 'Move the player one cell in the direction it is facing.',
  },
  {
    type: 'turn left',
    label: 'Turn Left',
    pythonCode: 'turn_left()',
    futureBlocklyBlockType: 'maze_turn_left',
    description: 'Turn the player 90 degrees to the left.',
  },
  {
    type: 'turn right',
    label: 'Turn Right',
    pythonCode: 'turn_right()',
    futureBlocklyBlockType: 'maze_turn_right',
    description: 'Turn the player 90 degrees to the right.',
  },
]

export function getMazeCommandConfig(
  commandType: moveCommand,
): MazeCommandConfig {
  const config = mazeCommandConfigs.find(
    (commandConfig) => commandConfig.type === commandType,
  )

  if (!config) {
    throw new Error(`Unknown maze command type: ${commandType}`)
  }

  return config
}

export function getMazeCommandLabel(commandType: moveCommand) {
  return getMazeCommandConfig(commandType).label
}

export function getMazeCommandPythonCode(commandType: moveCommand) {
  return getMazeCommandConfig(commandType).pythonCode
}

export function getMazeCommandDescription(commandType: moveCommand) {
  return getMazeCommandConfig(commandType).description
}

export function getFutureBlocklyBlockType(commandType: moveCommand) {
  return getMazeCommandConfig(commandType).futureBlocklyBlockType
}

import type { moveCommand } from '../maze/mazeTypes'
import { mazeCommandConfigs } from '../commands/MazeCommandConfig'

export type MockBlock = {
  id: string
  blockType: string
}

export type BlockCommandAdapterResult = {
  commands: moveCommand[]
  errors: string[]
}

const blockTypeToCommandType = new Map<string, moveCommand>(
  mazeCommandConfigs.map((commandConfig) => [
    commandConfig.futureBlocklyBlockType,
    commandConfig.type,
  ]),
)

export const sampleMockBlockProgram: MockBlock[] = [
  {
    id: 'block-1',
    blockType: 'maze_move_forward',
  },
  {
    id: 'block-2',
    blockType: 'maze_move_forward',
  },
  {
    id: 'block-3',
    blockType: 'maze_turn_left',
  },
  {
    id: 'block-4',
    blockType: 'maze_move_forward',
  },
]

export function convertBlockProgramToCommands(
  blocks: MockBlock[],
): BlockCommandAdapterResult {
  const commands: moveCommand[] = []
  const errors: string[] = []

  blocks.forEach((block, index) => {
    const commandType = blockTypeToCommandType.get(block.blockType)

    if (!commandType) {
      errors.push(
        `Block ${index + 1} has unknown block type: ${block.blockType}`,
      )
      return
    }

    commands.push(commandType)
  })

  return {
    commands,
    errors,
  }
}

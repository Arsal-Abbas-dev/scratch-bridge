import type { moveCommand } from '../maze/mazeTypes'
import { getMazeCommandPythonCode } from '../commands/MazeCommandConfig'

export function generatePythonCode(commands: moveCommand[]) {
  if (commands.length === 0) {
    return '# Run maze commands to see Python code here.'
  }

  return commands.map(getMazeCommandPythonCode).join('\n')
}

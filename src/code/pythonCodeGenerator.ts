import type { moveCommand } from '../maze/mazeTypes'

const pythonLineByCommand: Record<moveCommand,string> = {
    'move forward' : 'move_forward()',
    'turn left' : 'turn_left()',
    'turn right' : 'turn_right()',
}
export function getPythonLineByCommand(command: moveCommand) {
    return pythonLineByCommand[command]
}
export function generatePythonCode(commandHistory: moveCommand[]) {
    if (commandHistory.length === 0) {
        return '# Run maze commands to see Python code here'
    }
    return commandHistory.map(getPythonLineByCommand).join('\n')
}
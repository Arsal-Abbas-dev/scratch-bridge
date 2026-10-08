import type { Program } from './programTypes'

export type PythonLine = {
  text: string
  depth: number
  nodeId: string
}

export function programToPython(program: Program): PythonLine[] {
  const lines: PythonLine[] = []

  for (const node of program) {
    if (node.kind === 'move') {
      let text: string

      switch (node.action) {
        case 'forward':
          text = 'move_forward()'
          break

        case 'left':
          text = 'turn_left()'
          break

        case 'right':
          text = 'turn_right()'
          break
        default:
            throw new Error(`Unknown function: ${node.action}`)
      }

      lines.push({
        text,
        depth: 0,
        nodeId: node.origin.blockId,
      })
    }
  }

  return lines
}
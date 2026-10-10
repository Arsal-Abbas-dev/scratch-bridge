import type { Program } from './programTypes'
 
export type PythonLine = {
  text: string
  depth: number
  nodeId: string
}
 
const pythonByAction = {
  forward: 'move_forward()',
  left: 'turn_left()',
  right: 'turn_right()',
} as const

function addLines(nodes: Program, depth: number, lines: PythonLine[]) {
  for (const node of nodes) {
    if (node.kind === 'move') {
      lines.push({
        text: pythonByAction[node.action],
        depth,
        nodeId: node.origin.blockId,
      })
    } else {
      lines.push({
        text: `for _ in range(${node.times}):`,
        depth,
        nodeId: node.origin.blockId,
      })
      if (node.body.length === 0) {
        lines.push({ text: 'pass', depth: depth + 1, nodeId: node.origin.blockId })
      } else {
        addLines(node.body, depth + 1, lines)
      }
    }
  }
}
 
export function programToPython(program: Program): PythonLine[] {
  const lines: PythonLine[] = []
  addLines(program, 0, lines)
  return lines
}

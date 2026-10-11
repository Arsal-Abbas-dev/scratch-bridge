import { describe, it, expect } from 'vitest'
import { programToPython } from './programToPython'
import type { Program } from './programTypes'
 
const origin = (id: string) => ({ blockId: id, form: 'block' as const })
 
describe('programToPython', () => {
  it('writes one line for each move', () => {
    const program: Program = [
      { kind: 'move', action: 'forward', origin: origin('a') },
      { kind: 'move', action: 'left', origin: origin('b') },
      { kind: 'move', action: 'right', origin: origin('c') },
    ]
    const lines = programToPython(program)
    expect(lines.map((line) => line.text)).toEqual(['move_forward()', 'turn_left()', 'turn_right()'])
    expect(lines.every((line) => line.depth === 0)).toBe(true)
  })
 
  it('indents the inside of a nested loop', () => {
    const program: Program = [
      {
        kind: 'repeat',
        times: 2,
        origin: origin('outer'),
        body: [
          {
            kind: 'repeat',
            times: 3,
            origin: origin('inner'),
            body: [{ kind: 'move', action: 'forward', origin: origin('m') }],
          },
        ],
      },
    ]
 
    const lines = programToPython(program)
 
    expect(lines.map((line) => ({ text: line.text, depth: line.depth }))).toEqual([
      { text: 'for _ in range(2):', depth: 0 },
      { text: 'for _ in range(3):', depth: 1 },
      { text: 'move_forward()', depth: 2 },
    ])
  })
 
  it('writes pass for a loop with nothing inside', () => {
    const program: Program = [{ kind: 'repeat', times: 4, body: [], origin: origin('r') }]
    expect(programToPython(program).map((line) => line.text)).toEqual(['for _ in range(4):', 'pass'])
  })
})

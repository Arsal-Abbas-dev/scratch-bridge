import { describe, it, expect } from 'vitest'
import { distance, suggestCommand } from './friendlyErrors'
import { parseLine, tokenize } from './pythonParser'
 
describe('tokenize', () => {
  it('cuts a loop line into pieces', () => {
    const { tokens } = tokenize('for _ in range(3):')
    expect(tokens.map((token) => token.text)).toEqual(['for', '_', 'in', 'range', '(', '3', ')', ':'])
  })
 
  it('reports a character it does not know', () => {
    expect(tokenize('move_forward();').badCharacter).toBe(';')
  })
})
 
describe('parseLine: good lines', () => {
  it.each([
    ['move_forward()', { kind: 'move', action: 'forward' }],
    ['turn_left()', { kind: 'move', action: 'left' }],
    ['turn_right()', { kind: 'move', action: 'right' }],
    ['  move_forward ( )  ', { kind: 'move', action: 'forward' }],
    ['for _ in range(3):', { kind: 'loop', times: 3 }],
    ['for i in range(20):', { kind: 'loop', times: 20 }],
    ['for _ in range(1):', { kind: 'loop', times: 1 }],
    ['for _ in range( 5 ) :', { kind: 'loop', times: 5 }],
  ])('accepts %j', (line, expected) => {
    const result = parseLine(line)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.node).toEqual(expected)
    }
  })
})
 
describe('parseLine: mistakes', () => {
  it.each([
    ['move_foward()', 'UNKNOWN_COMMAND'],
    ['banana()', 'UNKNOWN_COMMAND'],
    ['move_forward', 'MISSING_PARENS'],
    ['move_forward(', 'MISSING_PARENS'],
    ['Move_Forward()', 'WRONG_CASE'],
    ['TURN_LEFT()', 'WRONG_CASE'],
    ['for _ in range(3)', 'MISSING_COLON'],
    ['for _ in range(three):', 'BAD_NUMBER'],
    ['for _ in range(0):', 'BAD_NUMBER'],
    ['for _ in range(21):', 'BAD_NUMBER'],
    ['for _ in range(3.5):', 'BAD_NUMBER'],
    ['for _ in range():', 'BAD_NUMBER'],
    ['for _ in range(3', 'BAD_LOOP'],
    ['for x range(3):', 'BAD_LOOP'],
    ['', 'EMPTY_LINE'],
    ['     ', 'EMPTY_LINE'],
    ['move_forward();', 'BAD_CHARACTER'],
    ['move_forward() now', 'EXTRA_TEXT'],
  ])('%j gives %s', (line, code) => {
    const result = parseLine(line)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.code).toBe(code)
    }
  })
 
  it('suggests the right command for a small typo', () => {
    const result = parseLine('move_foward()')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.message).toBe('I don\'t know "move_foward". Did you mean move_forward()?')
    }
  })
 
  it('does not guess when nothing is close', () => {
    const result = parseLine('banana()')
    if (!result.ok) {
      expect(result.message).toContain('The commands are')
    }
  })
})
 
describe('did you mean', () => {
  it('counts the changes between two words', () => {
    expect(distance('kitten', 'sitting')).toBe(3)
    expect(distance('same', 'same')).toBe(0)
    expect(distance('', 'abc')).toBe(3)
  })
 
  it('suggests a command only when it is close', () => {
    expect(suggestCommand('turn_lef')).toBe('turn_left')
    expect(suggestCommand('banana')).toBeNull()
  })
})

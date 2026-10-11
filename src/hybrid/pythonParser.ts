import { friendlyMessage, KNOWN_COMMANDS, suggestCommand, type ErrorCode } from './friendlyErrors'
 
export type ParsedLine =
  | { kind: 'move'; action: 'forward' | 'left' | 'right' }
  | { kind: 'loop'; times: number }
 
export type ParseResult =
  | { ok: true; node: ParsedLine }
  | { ok: false; code: ErrorCode; message: string }
 
type Token = {
  type: 'word' | 'number' | 'symbol'
  text: string
}
 
const actionByCommand = {
  move_forward: 'forward',
  turn_left: 'left',
  turn_right: 'right',
} as const
 
//cuts line into tokens
export function tokenize(text: string): { tokens: Token[]; badCharacter: string | null } {
  const tokens: Token[] = []
  let i = 0
 
  while (i < text.length) {
    const character = text.charAt(i)
 
    if (character === ' ' || character === '\t') {
      i += 1
    } else if (/[A-Za-z_]/.test(character)) {
      let end = i
      while (end < text.length && /[A-Za-z0-9_]/.test(text.charAt(end))) {
        end += 1
      }
      tokens.push({ type: 'word', text: text.slice(i, end) })
      i = end
    } else if (/[0-9]/.test(character)) {
      let end = i
      while (end < text.length && /[0-9.]/.test(text.charAt(end))) {
        end += 1
      }
      tokens.push({ type: 'number', text: text.slice(i, end) })
      i = end
    } else if (character === '(' || character === ')' || character === ':') {
      tokens.push({ type: 'symbol', text: character })
      i += 1
    } else {
      return { tokens, badCharacter: character }
    }
  }
 
  return { tokens, badCharacter: null }
}
 
function fail(code: ErrorCode, details?: { word?: string; suggestion?: string | null }): ParseResult {
  return { ok: false, code, message: friendlyMessage(code, details) }
}
 
function parseCommand(tokens: Token[]): ParseResult {
  const name = tokens[0]?.text ?? ''
 
  if (!KNOWN_COMMANDS.includes(name)) {
    if (KNOWN_COMMANDS.includes(name.toLowerCase())) {
      return fail('WRONG_CASE', { word: name })
    }
    return fail('UNKNOWN_COMMAND', { word: name, suggestion: suggestCommand(name) })
  }
 
  if (tokens[1]?.text !== '(' || tokens[2]?.text !== ')') {
    return fail('MISSING_PARENS', { word: name })
  }
 
  if (tokens.length > 3) {
    return fail('EXTRA_TEXT')
  }
 
  return {
    ok: true,
    node: { kind: 'move', action: actionByCommand[name as keyof typeof actionByCommand] },
  }
}
 
function parseLoop(tokens: Token[]): ParseResult {
  //for (name) in range (number):
  const [, variable, inWord, rangeWord, open, amount, close, colon] = tokens
 
  if (
    variable?.type !== 'word' ||
    inWord?.text !== 'in' ||
    rangeWord?.text !== 'range' ||
    open?.text !== '(' ||
    amount === undefined
  ) {
    return fail('BAD_LOOP')
  }
 
  const times = Number(amount.text)
 
  if (amount.type !== 'number' || !Number.isInteger(times) || times < 1 || times > 20) {
    return fail('BAD_NUMBER')
  }
 
  if (close?.text !== ')') {
    return fail('BAD_LOOP')
  }
 
  if (colon === undefined) {
    return fail('MISSING_COLON')
  }
 
  if (colon.text !== ':' || tokens.length > 8) {
    return fail('BAD_LOOP')
  }
 
  return { ok: true, node: { kind: 'loop', times } }
}
 
//uses tokens to understand the line
export function parseLine(text: string): ParseResult {
  if (text.trim() === '') {
    return fail('EMPTY_LINE')
  }
 
  const { tokens, badCharacter } = tokenize(text)
 
  if (badCharacter !== null) {
    return fail('BAD_CHARACTER', { word: badCharacter })
  }
 
  const first = tokens[0]
 
  if (first?.type !== 'word') {
    return fail('UNKNOWN_COMMAND', { word: text.trim() })
  }
 
  if (first.text === 'for') {
    return parseLoop(tokens)
  }
 
  return parseCommand(tokens)
}

export type ErrorCode =
  | 'EMPTY_LINE'
  | 'UNKNOWN_COMMAND'
  | 'MISSING_PARENS'
  | 'WRONG_CASE'
  | 'MISSING_COLON'
  | 'BAD_NUMBER'
  | 'BAD_LOOP'
  | 'BAD_CHARACTER'
  | 'EXTRA_TEXT'
  | 'LOOP_NEEDS_BLOCKS'
 
export const KNOWN_COMMANDS = ['move_forward', 'turn_left', 'turn_right']

//Levenshtein distance
export function distance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index)
 
  for (let i = 1; i <= a.length; i++) {
    const current = [i]
 
    for (let j = 1; j <= b.length; j++) {
      const cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1
      current.push(
        Math.min(
          (previous[j] ?? 0) + 1, // delete a letter
          (current[j - 1] ?? 0) + 1, // add a letter
          (previous[j - 1] ?? 0) + cost, // change a letter
        ),
      )
    }
 
    previous = current
  }
 
  return previous[b.length] ?? 0
}

//returns null when more than 2 letters away
export function suggestCommand(word: string): string | null {
  let best: string | null = null
  let bestDistance = 3
 
  for (const command of KNOWN_COMMANDS) {
    const d = distance(word.toLowerCase(), command)
 
    if (d < bestDistance) {
      best = command
      bestDistance = d
    }
  }
 
  return best
}
 
type Details = {
  word?: string
  suggestion?: string | null
}
 
export function friendlyMessage(code: ErrorCode, details: Details = {}): string {
  const word = details.word ?? ''
 
  switch (code) {
    case 'EMPTY_LINE':
      return 'The line is empty. Type a command like move_forward().'
    case 'UNKNOWN_COMMAND':
      return details.suggestion
        ? `I don't know "${word}". Did you mean ${details.suggestion}()?`
        : `I don't know "${word}". The commands are move_forward(), turn_left() and turn_right().`
    case 'MISSING_PARENS':
      return `Commands need brackets at the end. Try ${word}().`
    case 'WRONG_CASE':
      return `Python cares about capital letters. Write it in lower case: ${word.toLowerCase()}().`
    case 'MISSING_COLON':
      return 'A loop line must end with a colon ":". The colon tells Python the loop body comes next.'
    case 'BAD_NUMBER':
      return 'range() needs a whole number from 1 to 20, like range(3).'
    case 'BAD_LOOP':
      return 'A loop line looks like this: for _ in range(3):'
    case 'BAD_CHARACTER':
      return `I don't understand the character "${word}".`
    case 'EXTRA_TEXT':
      return 'There is extra text after the command. A command line is only the command, like move_forward().'
    case 'LOOP_NEEDS_BLOCKS':
      return 'A typed loop line cannot hold blocks yet. Use the repeat block for loops.'
  }
}

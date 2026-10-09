import { runCommand } from '../maze/mazeEngine'
import type { mazeLevel, mazeState, moveCommand } from '../maze/mazeTypes'
import type { Program } from './programTypes'
 
export const maxSteps = 500
 
export type StopReason = 'complete' | 'blocked' | 'finished' | 'too_many_steps'
 
export type RunStep = {
  state: mazeState
  nodeId: string
}
//translates between engine and program
const commandByAction: Record<'forward' | 'left' | 'right', moveCommand> = {
  forward: 'move forward',
  left: 'turn left',
  right: 'turn right',
}
 
type RunContext = {
  level: mazeLevel
  state: mazeState
  steps: number
  stopReason: StopReason | null
}
 
function* runNodes(nodes: Program, context: RunContext): Generator<RunStep, void, void> {
  for (const node of nodes) {
    if (context.stopReason) {
      return
    }
 
    if (context.steps >= maxSteps) {
      context.stopReason = 'too_many_steps'
      return
    }
 
    context.steps += 1
    context.state = runCommand(context.level, context.state, commandByAction[node.action])
 
    yield { state: context.state, nodeId: node.origin.blockId }
 
    if (context.state.status === 'blocked') {
      context.stopReason = 'blocked'
    } else if (context.state.status === 'complete') {
      context.stopReason = 'complete'
    }
  }
}
 
export function* runProgram(
  level: mazeLevel,
  program: Program,
  startState: mazeState,
): Generator<RunStep, StopReason, void> {
  const context: RunContext = { level, state: startState, steps: 0, stopReason: null }
 
  yield* runNodes(program, context)
 
  return context.stopReason ?? 'finished'
}

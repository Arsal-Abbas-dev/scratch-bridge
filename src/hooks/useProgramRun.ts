import { useCallback, useEffect, useRef, useState } from 'react'
import { createInitialMazeState } from '../maze/mazeEngine'
import type { mazeLevel } from '../maze/mazeTypes'
import type { Program } from '../program/programTypes'
import { runProgram, type RunStep, type StopReason } from '../program/programRunner'
 
const stepDelay = 400 //in ms
const startMsg = 'Build a program, then press Run.'
 
function messageForStop(reason: StopReason) {
  if (reason === 'complete') return 'Success! You reached the star.'
  if (reason === 'blocked') return 'Blocked by a wall. Try turning first.'
  if (reason === 'too_many_steps') {
    return 'Your program ran 500 steps without finishing. Is a loop repeating too many times?'
  }
  return 'The program finished, but the robot did not reach the star yet.'
}
 
export function useProgramRun(level: mazeLevel, program: Program) {
  const [mazeState, setMazeState] = useState(() => createInitialMazeState(level))
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)
  const [message, setMessage] = useState(startMsg)
  const [isRunning, setIsRunning] = useState(false)
 
  const generatorRef = useRef<Generator<RunStep, StopReason, void> | null>(null)
  const timerRef = useRef<number | null>(null)
 
  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsRunning(false)
  }, [])
 
  const reset = useCallback(() => {
    stopTimer()
    generatorRef.current = null
    setMazeState(createInitialMazeState(level))
    setActiveNodeId(null)
    setMessage(startMsg)
  }, [level, stopTimer])
 
  const advance = useCallback((): boolean => {
    if (!generatorRef.current) {
      const startState = createInitialMazeState(level)
      generatorRef.current = runProgram(level, program, startState)
      setMazeState(startState)
      setActiveNodeId(null)
    }
 
    const result = generatorRef.current.next()
 
    if (result.done) {
      generatorRef.current = null
      setActiveNodeId(null)
      setMessage(messageForStop(result.value))
      return true
    }
 
    setMazeState(result.value.state)
    setActiveNodeId(result.value.nodeId)
    setMessage(
      result.value.state.status === 'complete'
        ? messageForStop('complete')
        : result.value.state.message,
    )
    return false
  }, [level, program])
 
  const step = useCallback(() => {
    if (timerRef.current !== null) {
      return
    }
    advance()
  }, [advance])
 
  const run = useCallback(() => {
    if (timerRef.current !== null) {
      return
    }
    setIsRunning(true)
    timerRef.current = window.setInterval(() => {
      const isOver = advance()
      if (isOver) {
        stopTimer()
      }
    }, stepDelay)
  }, [advance, stopTimer])
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
      }
    }
  }, [])
 
  return { mazeState, activeNodeId, message, isRunning, run, step, reset }
}

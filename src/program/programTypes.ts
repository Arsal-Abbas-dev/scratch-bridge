export type Origin = { blockId: string; form: 'block' | 'text' }
export type ProgramNode =
  | { kind: 'move'; action: 'forward' | 'left' | 'right'; origin: Origin }  
export type Program = ProgramNode[]
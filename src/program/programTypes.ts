export type Origin = { blockId: string; form: 'block' | 'text' }
export type ProgramNode =
  | { kind: 'move'; action: 'forward' | 'left' | 'right'; origin: Origin }  
  | { kind: 'repeat'; times: number; body: Program; origin: Origin }
export type Program = ProgramNode[]
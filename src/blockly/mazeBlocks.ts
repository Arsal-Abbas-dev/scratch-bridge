import * as Blockly from 'blockly/core'

Blockly.common.defineBlocksWithJsonArray([
  {type: 'maze_start', message0: 'when Run clicked', nextStatement: null,colour: 120},
  {type: 'maze_move_forward', message0: 'move forward', previousStatement: null, nextStatement: null, colour: 210},
  {type: 'maze_turn_left', message0: 'turn left', previousStatement: null, nextStatement: null, colour: 210},
  {type: 'maze_turn_right', message0: 'turn right', previousStatement: null, nextStatement: null, colour: 210},
  {type: 'maze_repeat', message0: 'repeat %1 times', args0: [{ type: 'field_number', name: 'times', value: 3, min: 1, max: 20, precision: 1 },], message1: '%1', args1: [{ type: 'input_statement', name: 'do' }], previousStatement: null, nextStatement: null, colour: 290,},
])
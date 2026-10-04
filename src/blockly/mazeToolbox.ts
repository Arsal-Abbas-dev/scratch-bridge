import * as Blockly from 'blockly/core'
export const mazeBlocklyToolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Maze Movement',
      colour: '#2563eb',
      toolboxitemid: 'maze-movement-category',
      contents: [
        {
          kind: 'label',
          text: 'Movement blocks will be added later.',
          'web-class': 'blockly-toolbox-message',
        },
        {
          kind: 'label',
          text: 'This category will contain Move Forward, Turn Left, and Turn Right.',
          'web-class': 'blockly-toolbox-message',
        },
      ],
    },
    {
      kind: 'sep',
    },
    {
      kind: 'category',
      name: 'Loops',
      colour: '#7c3aed',
      toolboxitemid: 'loops-category',
      contents: [
        {
          kind: 'label',
          text: 'Repeat blocks will be added later.',
          'web-class': 'blockly-toolbox-message',
        },
        {
          kind: 'label',
          text: 'Variables will not be included in this project version.',
          'web-class': 'blockly-toolbox-message',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Conditions',
      colour: '#d97706',
      toolboxitemid: 'conditions-category',
      contents: [
        {
          kind: 'label',
          text: 'Condition blocks will be added later.',
          'web-class': 'blockly-toolbox-message',
        },
        {
          kind: 'label',
          text: 'The first planned condition is If Path Ahead.',
          'web-class': 'blockly-toolbox-message',
        },
      ],
    },
  ],
}


  Blockly.common.defineBlocksWithJsonArray([
    {
      type: 'maze_start',
      message0: 'when Run clicked',
      nextStatement: null,
      colour: 120
    },

    {
      type: 'maze_move_forward',
      message0: 'move forward',
      previousStatement: null,
      nextStatement: null,
      colour: 210
    },

    {
      type: 'maze_turn_left',
      message0: 'turn left',
      previousStatement: null,
      nextStatement: null,
      colour: 210
    },

    {
      type: 'maze_turn_right',
      message0: 'turn right',
      previousStatement: null,
      nextStatement: null,
      colour: 210
    }
  ])
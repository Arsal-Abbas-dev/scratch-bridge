export const mazeBlocklyToolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Maze Movement',
      colour: '#2563eb',
      toolboxitemid: 'maze-movement-category',
      contents: [
        {type: 'maze_start', message0: 'when Run clicked', nextStatement: null,colour: 120},
        {type: 'maze_move_forward', message0: 'move forward', previousStatement: null, nextStatement: null, colour: 210},
        {type: 'maze_turn_left', message0: 'turn left', previousStatement: null, nextStatement: null, colour: 210},
        {type: 'maze_turn_right', message0: 'turn right', previousStatement: null, nextStatement: null, colour: 210}
      ],
    },
    {
      kind: 'sep',
    },
  ],
}
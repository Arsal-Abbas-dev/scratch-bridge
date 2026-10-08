export const mazeBlocklyToolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Maze Movement',
      colour: '#2563eb',
      toolboxitemid: 'maze-movement-category',
      contents: [
        {kind: 'block',type: 'maze_move_forward'},
        {kind: 'block',type: 'maze_turn_right'},
        {kind: 'block',type: 'maze_turn_left'},
      ],
    },
    {
      kind: 'sep',
    },
  ],
}
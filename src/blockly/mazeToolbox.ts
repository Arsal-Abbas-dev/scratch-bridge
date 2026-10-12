export const mazeBlocklyToolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Maze Movement',
      colour: '#2563eb',
      contents: [
        {kind: 'block', type: 'maze_move_forward'},
        {kind: 'block', type: 'maze_turn_right'},
        {kind: 'block', type: 'maze_turn_left'},
      ],
    },
    {
      kind: 'category',
      name: 'Loops',
      colour: '#9333ea',
      contents: [
        {kind: 'block', type: 'maze_repeat'}
      ],
    },
    {
      kind: 'category',
      name: 'Python text',
      colour: '#d97706',
      contents: [{ kind: 'block', type: 'py_line' }],
    },
  ],
}
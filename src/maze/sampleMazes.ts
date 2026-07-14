import type { mazeLevel } from './mazeTypes'

export const sampleMazes: mazeLevel[] = [
    {
        id:0,
        name:'Base Plate',
        concept:'Nothing',
        instructions:'This is the baseplate, a completely blank template!',
        grid: [
            ['start', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'path'],
            ['path', 'path', 'path', 'path', 'goal'],
        ],
        facing: 'right'
    },
    {
        id:1,
        name:'Straight Path',
        concept: 'Sequencing',
        instructions: 'Move from the start to the goal by placing commands in the correct order.',
        grid: [
            ['wall', 'wall', 'wall', 'wall', 'wall'],
            ['wall', 'wall', 'wall', 'wall', 'wall'],
            ['wall', 'start', 'path', 'goal', 'wall'],
            ['wall', 'wall', 'wall', 'wall', 'wall'],
            ['wall', 'wall', 'wall', 'wall', 'wall'],
        ],
        facing: 'right'
    },
    {
        id: 2,
        name: 'First Turn',
        concept: 'Turning',
        instructions:
        'Use movement and turning commands to guide the character around the wall.',
        grid: [
            ['start', 'path', 'wall', 'path', 'path'],
            ['wall', 'path', 'wall', 'path', 'wall'],
            ['wall', 'path', 'path', 'path', 'goal'],
            ['wall', 'wall', 'wall', 'wall', 'path'],
            ['path', 'path', 'path', 'path', 'path'],
        ],
        facing: 'right'
    },
    {
        id: 3,
        name: 'Repeated Steps',
        concept: 'Loops',
        instructions:
        'This maze will later be useful for showing why repeated commands can be replaced with a loop.',
        grid: [
            ['start', 'path', 'path', 'path', 'path'],
            ['wall', 'wall', 'wall', 'wall', 'path'],
            ['path', 'path', 'path', 'wall', 'path'],
            ['path', 'wall', 'path', 'path', 'path'],
            ['path', 'wall', 'wall', 'wall', 'goal'],
        ],
        facing: 'right'
  },

]
# Development Log

This file records the main design decisions, technical challenges, bugs, fixes, and reflections during the development of Scratch Gap Maze.

## Section 1: Project Setup 

- Created the React + TypeScript project using Vite.
- Installed project dependencies.
- Ran local development server successfully.
- Replaced default starter screen with a simple project title and description.
- Wrote a draft for the README file.
- Started a development log.
- Created a scope document to prevent the project from becoming too broad.

To do next:
- Blockly workspace area
- Maze display area
- Python code and feedback (error log) area

## Section 2: Basic Application Layout

- Created a reusable component structure (`src/components`).
- Added `Layout` component.
- Added a placeholder panel for the future Blockly workspace.
- Added a static maze preview panel.
- Added a code preview panel.
- Added a feedback panel for future beginner-friendly error messages.
- Replaced the default app styling with a custom layout.
- Seperated interface into components for scalability

To do next:
- Maze data model

## Section 3: Maze Data Model

- Created a folder (`src/maze`) for maze-related files.
- Added TypeScript types for maze cells, positions, directions, levels, and maze state.
- Created sample maze levels in a data file (sampleMazes.ts).
- Added maze engine helper functions.
- Added validation to ensure maze levels have a ruleset to adhere to.
- Updated the maze panel so it reads from the maze data model instead of a using hardcoded preview.
- Displayed the starting position, goal position, and starting direction (0-indexed).

To do next:
- Make maze display interactive (Run/Reset buttons)
- Add movement controls to the maze


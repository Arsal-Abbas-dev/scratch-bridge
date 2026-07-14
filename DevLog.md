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

## Section 4: Maze Display Structure

- Split the maze display into smaller reusable components.
- Added temporary movement buttons for Move Forward, Turn Left, Turn Right, and Reset.
- Added styling for the current player cell.
- Confirmed the maze loads from the typed maze data.
- Confirmed the player icon changes when the starting direction is temporarily changed.
- Confirmed the correct validation error display appears when a typed maze is invalid.

To do next:
- Make maze display interactive (Run/Reset buttons)
- Add movement logic to the maze
- Collision detection

## Section 5: Maze Movement Logic

- Added movement logic to the maze engine.
- Made the movement buttons interactive.
- Added wall collision detection so the player cannot move outside the maze or into wall cells.
- Added goal detection so that a 'success' message is displayed when the player reaches the goal.
- Added reset logic so the player can return to the starting position.
- Added command history so the learner's attempted logic is visible.

- Confirmed the player starts on the start cell and faces right.
- Confirmed Move Forward updates the player position.
- Confirmed Turn Left and Turn Right changes the player direction.
- Confirmed the player cannot move beyond the maze.
- Made the app show a 'blocked' message after a wall collision or maze edge collision.

To do next:
- Make Command Model
- Implement Python into the website


## Section 6: Python Code Preview from Commands

- Created a new folder (`src/code`) for code-generation utilities.
- Created `pythonCodeGenerator.ts` to translate maze commands into Python-style code.
- Updated `CodeView.tsx` so it can display generated Python-style code.
- Connected the live maze command history to a code view.
- Added an embedded Python Code View inside the maze panel.
- Code preview starts with a placeholder message
- Made it so that Reset clears the command history and code preview.

To do next:
- Move CodeView to its correct place
- Add a command program builder

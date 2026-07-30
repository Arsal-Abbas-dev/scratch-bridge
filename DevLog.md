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

## Section 7: Command Program Builder

- Created a `CommandBuilder` component.
- Added buttons for adding the movement commands to a planned program.
- Added a planned command list so the learner can see the program before running it.
- Added logic to add commands to and clear the planned program.
- Added logic to run the planned program on the maze all at once.
- Updated the Python Code View so it mirrors the planned program commands.
- Confirmed that Reset resets the maze but does not clear the planned program.

To do next:
- Move CodeView to its correct place
- Add a run summary to the program built using the command builder
- Make the command builder execute step-by-step

## Section 8: Program Execution Feedback

- Created a `ProgramRunSummary` component.
- Added a summary panel that appears below the Command Program Builder.
- Added `programRunResult` state in `MazeView`.
- Added logic to track how many commands were in the planned program.
- Added logic to track which commands were attempted.
- Added logic to show the final status and final message after the program ran.
- Updated the program runner so it returns both the final maze state and the attempted commands.

To do next:
- Move CodeView to its correct place
- Make the command builder execute step-by-step

## Section 9: Step-by-Step Program Execution

- Created a `ProgramStepControls` component.
- Added a Step-by-Step Runner panel.
- Added a Start Step Run button.
- Added a Run Next Command button.
- Added a Stop Step Run button.
- Added step mode state in `MazeView`.
- Added current step tracking in `MazeView`.
- Added attempted command tracking for step-by-step execution.
- Connected the step runner to the existing planned command list.
- Connected the step runner to the existing maze engine.
- Updated the Program Run Summary after each step.


### Current limitation

The step-by-step runner is manual. The learner must click Run Next Command for each step. The app does not yet animate the whole program automatically, and it does not yet highlight the exact command inside the Python Code View.

### Next step

On Day 10, I will improve the learning connection between the planned commands and the Python Code View by preparing command highlighting or clearer code-to-action feedback.


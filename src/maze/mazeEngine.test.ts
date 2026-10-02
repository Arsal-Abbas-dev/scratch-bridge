/*start and goal are found
validateMaze rejects 0 starts, 2 goals and uneven rows
four turnLeft calls return to the starting direction
turnRight undoes turnLeft
moving into a wall gives blocked and the position doesn't change
moving off the edge is blocked
reaching the goal gives complete
the start direction comes from level.facing*/
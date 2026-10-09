import { useState } from 'react'
import { sampleMazes } from '../maze/sampleMazes'
import { GameScreen } from './GameScreen'
 
// Level 0 is the blank "Base Plate". Learners play levels 1, 2, 3 ...
const playableLevels = sampleMazes.filter((level) => level.id > 0)
 
export function Layout() {
  const [levelId, setLevelId] = useState(playableLevels[0]!.id)
  const level = playableLevels.find((item) => item.id === levelId) ?? playableLevels[0]!
 
  return (
    <main className="app-layout">
      <header className="app-header">
        <div>
          <p className="eyebrow">Scratch Bridge</p>
          <h1>Guide the robot to the star</h1>
        </div>
 
        <p className="header-summary">
          Drag blocks to guide the robot to the star. Right-click a block to
          turn it into Python.
        </p>
      </header>
 
      <nav className="level-buttons" aria-label="Levels">
        {playableLevels.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === level.id ? 'level-button level-button-active' : 'level-button'}
            onClick={() => setLevelId(item.id)}
          >
            Level {item.id}
          </button>
        ))}
      </nav>
 
      <GameScreen key={level.id} level={level} />
    </main>
  )
}

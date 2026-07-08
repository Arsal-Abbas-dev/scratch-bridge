import type { mazeLevel } from '../maze/mazeTypes'

type levelSummaryProps = {
    level: mazeLevel
}
export function LevelSummary({level}: levelSummaryProps) {
    return (
        <div className="level-summary">
            <h3>{level.name}</h3>
            <p><strong>Concept:</strong>{level.concept}</p>
            <p>{level.instructions}</p>
        </div>
    );
}
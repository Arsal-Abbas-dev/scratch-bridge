export function MazeControls() {
    return (
        <div className="maze-controls" aria-label="Maze Controls">
            <button type="button" disabled>Move Forward</button>
            <button type="button" disabled>Turn Left</button>
            <button type="button" disabled>Turn Right</button>
            <button type="button" disabled>Reset</button>
        </div>
    );
}
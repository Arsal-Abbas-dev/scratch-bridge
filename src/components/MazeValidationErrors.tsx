type mazeValidationErrorsProps = {
    errors: string[]
}

export function MazeValidationErrors({errors}: mazeValidationErrorsProps) {
    if (errors.length === 0) {
        return null
    }
    return (
        <div className="maze-error-box">
            <strong>Maze Setup error:</strong>
            <ul>
                {errors.map((error)=> (
                    <li key={error}>{error}</li>
                ))}
            </ul>
        </div>
    );
}
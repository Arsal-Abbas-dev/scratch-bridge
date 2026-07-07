const sampleCode = 
`move_forward()
move_forward()
turn_right()
repeat(3):
    move_forward()`

export function CodeView() {
    return (
        <section className="panel code-panel">
            <div className="panel-header">
                <p className="panel-label">Step 3</p>
                <h2>Python-Style Code</h2>
            </div>
            <pre className="code-preview">
                <code>{sampleCode}</code>
            </pre>
            <p className="panel-note">Will update live</p>
        </section>
    );
}
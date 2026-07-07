import { BlocklyWorkspacePlaceholder } from "./BlocklyWorkspacePlaceholder";
import { MazeView } from "./MazeView";
import { CodeView } from "./CodeView";
import { FeedbackPanel } from "./FeedbackPanel";

export function Layout() {
    return (
        <main className="app-layout">
            <header className="app-header">
                <div>
                    <p className="eyebrow">Programming Transition Prototype</p>
                    <h1>Scratch Bridge</h1>
                </div>
                <p className="header-summary">A learning tool that will help beginners move gradually from visual blocks to Python-style code.</p>
            </header>
            <section className="workspace-grid">
                <BlocklyWorkspacePlaceholder/>
                <MazeView/>
                <aside className="right-column">
                    <CodeView/>
                    <FeedbackPanel/>
                </aside>
            </section>
        </main>
    );
}
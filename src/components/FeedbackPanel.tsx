type FeedbackPanelProps = {
  message: string
  tone: 'info' | 'success' | 'error'
}
 
export function FeedbackPanel({ message, tone }: FeedbackPanelProps) {
  return (
    <section className="panel feedback-panel">
      <div className="panel-header">
        <h2>Feedback</h2>
      </div>
 
      <div className={`feedback-message feedback-${tone}`} role="status">
        {message}
      </div>
    </section>
  )
}

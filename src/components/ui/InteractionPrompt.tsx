type InteractionPromptProps = {
  message: string
}

export default function InteractionPrompt({ message }: InteractionPromptProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 48,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        padding: '10px 16px',
        borderRadius: 6,
        background: 'rgba(0, 0, 0, 0.78)',
        color: '#f3f3f3',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 13,
        lineHeight: 1.4,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {message}
    </div>
  )
}

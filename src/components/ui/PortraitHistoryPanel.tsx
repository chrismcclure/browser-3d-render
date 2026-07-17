type PortraitHistoryPanelProps = {
  title: string
  story: string | null
  isLoading: boolean
  error: string | null
  onClose: () => void
}

export default function PortraitHistoryPanel({
  title,
  story,
  isLoading,
  error,
  onClose,
}: PortraitHistoryPanelProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 30,
        width: 'min(560px, calc(100vw - 32px))',
        maxHeight: 'min(70vh, 640px)',
        padding: '18px 20px',
        borderRadius: 8,
        background: 'rgba(0, 0, 0, 0.88)',
        color: '#f3f3f3',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 13,
        lineHeight: 1.55,
        boxShadow: '0 10px 28px rgba(0, 0, 0, 0.4)',
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        <div style={{ fontWeight: 600, color: '#d8b878', fontSize: 14 }}>{title}</div>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '4px 10px',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#f3f3f3',
            fontFamily: 'inherit',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>

      <div
        style={{
          overflowY: 'auto',
          paddingRight: 4,
          flex: 1,
        }}
      >
        {isLoading ? (
          <div style={{ opacity: 0.8, fontStyle: 'italic' }}>
            The royal historian is consulting the archives...
          </div>
        ) : null}

        {error ? <div style={{ color: '#ffb4ab' }}>{error}</div> : null}

        {story ? (
          <div
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 14,
              lineHeight: 1.65,
              color: '#ece6d8',
              whiteSpace: 'pre-wrap',
            }}
          >
            {story}
          </div>
        ) : null}
      </div>
    </div>
  )
}
